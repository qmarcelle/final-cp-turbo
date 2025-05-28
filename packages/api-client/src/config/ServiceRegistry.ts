import { EndpointResolver } from './EndpointResolver';

export interface ServiceConfig {
  name: string;
  baseUrl: string;
  type: 'REST' | 'SOAP'; // Could be an enum
}

export class ServiceRegistry {
  private static services: Map<string, ServiceConfig> = new Map();

  public static registerService(name: string, type: 'REST' | 'SOAP', explicitBaseUrl?: string): void {
    if (this.services.has(name)) {
      console.warn(`Service ${name} is already registered. Overwriting.`);
    }
    const baseUrl = explicitBaseUrl || EndpointResolver.getServiceUrl(name);
    this.services.set(name, { name, baseUrl, type });
    console.log(`Service registered: ${name} (${type}) -> ${baseUrl}`);
  }

  public static getServiceConfig(name: string): ServiceConfig {
    const config = this.services.get(name);
    if (!config) {
      // Attempt to auto-register if not found, assuming REST by default
      // This might be too implicit; explicit registration is safer.
      console.warn(`ServiceConfig for '${name}' not found. Attempting to auto-register as REST.`);
      this.registerService(name, 'REST');
      const newConfig = this.services.get(name);
      if (!newConfig) { // Should not happen if registerService is correct
         throw new Error(`Failed to auto-register and retrieve ServiceConfig for '${name}'.`);
      }
      return newConfig;
    }
    return config;
  }

  public static getBaseUrl(serviceName: string): string {
    return this.getServiceConfig(serviceName).baseUrl;
  }

  public static getServiceType(serviceName: string): 'REST' | 'SOAP' {
    return this.getServiceConfig(serviceName).type;
  }

  // Initialize some default services (example)
  // This should be done in a dedicated setup/init file or by each service constructor
  // static {
  //   this.registerService('MemberService', 'REST');
  //   this.registerService('PaymentService', 'REST');
  //   this.registerService('ClaimsService', 'REST');
  //   // Example for a SOAP service
  //   // this.registerService('LegacyClaimSoapService', 'SOAP', EndpointResolver.getSoapServiceUrl('LegacyClaimSoapService'));
  // }
}

// Call this early in your application setup if you are using explicit registration:
// ServiceRegistry.registerService('MemberService', 'REST');
// ServiceRegistry.registerService('PaymentService', 'REST');
// ServiceRegistry.registerService('AnotherService', 'SOAP', 'https://api.example.com/soap/another');
