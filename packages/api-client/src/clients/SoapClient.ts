import { BaseClient, RequestOptions } from './BaseClient';
import { xml2js, js2xml } from 'xml-js';
import { z } from 'zod';

export class SoapClient extends BaseClient {
  private soapActionHeader?: string;

  constructor(baseUrl: string, soapActionHeader?: string) {
    super(baseUrl);
    this.soapActionHeader = soapActionHeader;
  }

  private createSoapEnvelope(bodyContent: object): string {
    const soapBody = {
      'soap:Envelope': {
        _attributes: {
          'xmlns:soap': 'http://schemas.xmlsoap.org/soap/envelope/',
          // Add other necessary xmlns attributes here if needed
        },
        'soap:Body': bodyContent,
      },
    };
    return js2xml(soapBody, { compact: true, spaces: 2 });
  }

  protected async performSoapRequest<TResponse>(
    endpoint: string, // For SOAP, this might be fixed or part of the base URL
    soapAction: string, // The SOAPAction to be performed
    payload: object, // The JS object to be converted to XML for the SOAP body
    options: Omit<RequestOptions, 'body' | 'method'> = {},
    responseSchema?: z.ZodType<TResponse, any, any> // Zod schema for the relevant part of the SOAP response
  ): Promise<TResponse> {
    const soapEnvelope = this.createSoapEnvelope(payload);
    const headers = {
      'Content-Type': 'text/xml; charset=utf-8',
      SOAPAction: this.soapActionHeader || soapAction,
      ...options.headers,
    };

    let attempt = 0;
    const retries = options.retries ?? 3;
    const retryDelay = options.retryDelay ?? 1000;
    const timeout = options.timeout ?? 10000;

    // Use the parent BaseClient's request logic but adapt for XML
    // This is a simplified version. BaseClient's request needs to be more flexible
    // or SoapClient needs to reimplement some retry/timeout logic if BaseClient is too JSON-centric.
    // For now, we'll call a modified version of the fetch logic directly.

    while (attempt <= retries) {
        const controller = new AbortController();
        const signal = controller.signal;
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        try {
            // appInsights.trackTrace if configured in BaseClient or here
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                method: 'POST',
                headers,
                body: soapEnvelope,
                signal,
            });
            clearTimeout(timeoutId);

            // appInsights.trackDependencyData if configured

            if (!response.ok) {
                const errorText = await response.text();
                // Attempt to parse XML error for more details
                let errorDetails = errorText;
                try {
                    const parsedError = xml2js(errorText, { compact: true, alwaysChildren: true }) as any;
                    // Extract relevant error message from parsedError, e.g., from soap:Fault
                    const fault = parsedError['soap:Envelope']?.['soap:Body']?.['soap:Fault'];
                    if (fault) {
                        const faultString = fault.faultstring?._text || JSON.stringify(fault);
                        errorDetails = `SOAP Fault: ${faultString}`;
                    }
                } catch (e) { /* Ignore if error response is not valid XML */ }
                throw new Error(`HTTP error ${response.status}. ${errorDetails}`);
            }

            const xmlResponse = await response.text();
            const jsResponse: any = xml2js(xmlResponse, { compact: true, alwaysChildren: true });

            // Extract the relevant part of the SOAP body. This is highly dependent on WSDL.
            // Example: const result = jsResponse['soap:Envelope']['soap:Body']['YourOperationResponse']['YourResult'];
            // You'll need to make this part configurable or specific to each service method.
            // For now, we assume the response is the entire body content after parsing.
            const relevantData = jsResponse['soap:Envelope']?.['soap:Body'];

            if (!relevantData) {
                throw new Error('SOAP response body is missing or malformed.');
            }

            if (responseSchema) {
                const validationResult = responseSchema.safeParse(relevantData);
                if (!validationResult.success) {
                    console.error('Zod SOAP validation errors:', validationResult.error.errors);
                    throw new Error(`SOAP response validation failed: ${validationResult.error.message}`);
                }
                return validationResult.data;
            }

            return relevantData as TResponse;

        } catch (error: any) {
            clearTimeout(timeoutId);
            // appInsights.trackException if configured

            if (attempt === retries || (error.name === 'AbortError' && signal.aborted)) {
                console.error(`Final SOAP attempt failed for action ${soapAction} after ${attempt} retries or timeout. Error: ${error.message}`);
                throw error;
            }
            console.warn(`SOAP Attempt ${attempt + 1} failed for ${soapAction}. Retrying in ${retryDelay / 1000}s... Error: ${error.message}`);
            attempt++;
            await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
    }
    throw new Error('Unhandled error after SOAP retries');
  }

  // Example of a specific SOAP method call
  // public async someSoapOperation(params: SomeSoapParams, options?: Omit<RequestOptions, 'body' | 'method'>): Promise<SomeSoapResponse> {
  //   const payload = { 'ns1:SomeOperationRequest': { _attributes: { 'xmlns:ns1': 'http://example.com/your/namespace' }, 'ns1:Param1': params.param1 } };
  //   // This response extraction logic will be highly specific to your WSDL
  //   const rawResponse = await this.performSoapRequest(
  //     '/YourSoapServiceEndpoint', // Often fixed or part of baseUrl for SOAP
  //     'urn:YourNamespace:SomeOperation', // The SOAPAction
  //     payload,
  //     options
  //   );
  //   // Assume rawResponse is the content of soap:Body. You need to map it to SomeSoapResponse.
  //   // const mappedResponse = this.mapToSomeSoapResponse(rawResponse);
  //   // return mappedResponse;
  //   return rawResponse as SomeSoapResponse; // Placeholder
  // }
}
