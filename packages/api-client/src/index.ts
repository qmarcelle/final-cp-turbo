// This will export the singleton apiClient
// Example (will be built out as services are created):

// import { MemberService } from './services/MemberService';
// import { PaymentService } from './services/PaymentService';
// import { ClaimsService } from './services/ClaimsService';

// // Initialize services (this might involve passing config or dependencies)
// const memberService = new MemberService();
// const paymentService = new PaymentService();
// const claimsService = new ClaimsService();

// export const apiClient = {
//   member: memberService,
//   payment: paymentService,
//   claims: claimsService,
//   // ... other services
// };

// Export individual services and types for more granular imports if needed
// export * from './services/MemberService';
// export * from './services/PaymentService';
// export * from './services/ClaimsService';

export * from './clients/BaseClient';
export * from './clients/RestClient';
export * from './clients/SoapClient';
export * from './config/EndpointResolver';
export * from './config/ServiceRegistry';
export * from './transformers/RequestTransformer';
export * from './transformers/ResponseTransformer';

// Placeholder for the actual client when services are defined
export const apiClient = {
    placeholder: "API client services will be initialized here"
};

console.log('api-client package loaded');
