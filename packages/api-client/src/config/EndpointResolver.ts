export class EndpointResolver {
  private static getEnvVar(name: string, defaultValue?: string): string {
    const value = process.env[name];
    if (value === undefined) {
      if (defaultValue !== undefined) {
        console.warn(`Environment variable ${name} not set, using default value: ${defaultValue}`);
        return defaultValue;
      }
      throw new Error(`Required environment variable ${name} is not set.`);
    }
    return value;
  }

  public static getApiBaseUrl(): string {
    return this.getEnvVar('API_BASE_URL', 'http://localhost:3000/api'); // Default for local dev
  }

  public static getSoapServiceUrl(serviceName: string): string {
    // Example: SOAP_URL_MEMBERSERVICE, SOAP_URL_CLAIMSSERVICE
    // Or a generic SOAP_BASE_URL and then append service path
    return this.getEnvVar(`SOAP_URL_${serviceName.toUpperCase()}`, `http://localhost:8080/soap/${serviceName}`);
  }

  public static getServiceUrl(serviceName: string, environment?: string): string {
    const env = environment || process.env.NODE_ENV || 'development';
    // This can be expanded to read from a more complex config if needed
    // For now, assumes REST services use API_BASE_URL and SOAP uses getSoapServiceUrl
    // You might have a switch or a lookup map here if services types vary more.

    // A more robust ServiceRegistry might directly provide full URLs
    // This is a simpler resolver for now.
    if (serviceName.toLowerCase().includes('soap')) { // Convention for example
        return this.getSoapServiceUrl(serviceName);
    }
    return this.getApiBaseUrl(); // All REST services share a base URL by default
  }
}
