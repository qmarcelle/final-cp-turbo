# @portals/api-client

API client for accessing backend services in the portals monorepo.

This package provides a set of clients and services to interact with various backend APIs, including REST and SOAP services.

## Features

- **BaseClient**: Generic HTTP client with built-in support for retries, timeouts, and logging to Azure Application Insights.
- **RestClient**: Extends `BaseClient` for easy interaction with JSON-based RESTful APIs, including path templating and query parameter helpers.
- **SoapClient**: Extends `BaseClient` for SOAP-based services, handling XML to JavaScript conversion (using `xml-js`).
- **EndpointResolver**: Resolves service URLs based on environment variables (e.g., `API_BASE_URL`, `SOAP_URL_SERVICENAME`).
- **ServiceRegistry**: Maps service names to their base URLs and types, configurable per environment.
- **Transformers**: Utilities for request/response transformation (e.g., snake_case to camelCase, string dates to Date objects).
- **Service Classes**: Type-safe classes for specific backend services (e.g., `MemberService`, `PaymentService`) extending `RestClient` or `SoapClient`.
- **Singleton `apiClient`**: A single export for easy access to all registered services.
- **Runtime Validation**: Uses `zod` for runtime validation of API request inputs and response outputs where schemas are provided.

## Installation

This package is part of a pnpm workspace. It should be automatically available to other packages within the monorepo.

If you need to add it as a dependency to a new app or package within the workspace:

```bash
pnpm add @portals/api-client --workspace
```

## Configuration

### Environment Variables

The following environment variables are used by the `EndpointResolver`:

- `API_BASE_URL`: The base URL for RESTful services (e.g., `https://api.example.com/v1`). Defaults to `http://localhost:3000/api`.
- `SOAP_URL_SERVICENAME`: The specific URL for a SOAP service, where `SERVICENAME` is the uppercase name of the service (e.g., `SOAP_URL_AUTHENTICATIONSERVICE=https://soap.example.com/auth`). Defaults to `http://localhost:8080/soap/SERVICENAME`.
- `APPINSIGHTS_INSTRUMENTATIONKEY`: Your Azure Application Insights instrumentation key for logging.

Ensure these are set in your environment (e.g., via `.env` files loaded by your application).

### Service Registration

Services need to be registered with the `ServiceRegistry` if they are not implicitly discoverable or require specific configurations. While service constructors often handle their own registration, you can also do it explicitly:

```typescript
import { ServiceRegistry, EndpointResolver } from '@portals/api-client';

// Early in your application setup (e.g., main app file or a dedicated config file)
ServiceRegistry.registerService('MyRestService', 'REST');
ServiceRegistry.registerService(
  'MySoapService',
  'SOAP',
  EndpointResolver.getSoapServiceUrl('MySoapService') // Or a hardcoded URL
);
```

## Usage

Once services are defined and registered (typically done within their respective class files), you can use the singleton `apiClient`:

```typescript
import { apiClient } from '@portals/api-client';
import { z } from 'zod';

// Define Zod schemas for request and response types for type safety and validation
const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  createdAt: z.date(), // ResponseTransformer will attempt to parse string to Date
});

type User = z.infer<typeof UserSchema>;

const NewUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});
type NewUser = z.infer<typeof NewUserSchema>;

async function fetchUser(userId: string): Promise<User | null> {
  try {
    // Assuming MemberService is defined and has a getUser method
    // And getUser method is configured to use UserSchema for response validation
    // const user = await apiClient.member.getUser(userId, {}, UserSchema);
    // console.log('User:', user);
    // return user;

    // Placeholder until MemberService is implemented:
    console.log(`Placeholder: Fetching user ${userId}`);
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 500));
    const mockUserData = {
        id: userId,
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        created_at: new Date().toISOString(), // Simulate snake_case from backend
    };
    // Manually use ResponseTransformer here for demonstration
    const { ResponseTransformer } = await import('@portals/api-client');
    return ResponseTransformer.transform(mockUserData, UserSchema);

  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
}

async function createUser(userData: NewUser): Promise<User | null> {
  try {
    // Assuming MemberService has a createUser method
    // that uses NewUserSchema for request and UserSchema for response validation
    // const newUser = await apiClient.member.createUser(userData, NewUserSchema, UserSchema);
    // console.log('Created User:', newUser);
    // return newUser;
    
    // Placeholder:
    console.log('Placeholder: Creating user', userData);
    const { RequestTransformer, ResponseTransformer } = await import('@portals/api-client');
    const transformedRequest = RequestTransformer.transform(userData, NewUserSchema);
    console.log('Transformed request for backend:', transformedRequest);
    // Simulating API call and response
    await new Promise(resolve => setTimeout(resolve, 500));
    const mockNewUserData = {
        id: 'user-' + Math.random().toString(36).substring(2),
        ...transformedRequest, // Use the transformed (snake_case) data
        created_at: new Date().toISOString(),
    };
    return ResponseTransformer.transform(mockNewUserData, UserSchema);

  } catch (error) {
    console.error('Failed to create user:', error);
    return null;
  }
}

// Example calls (uncomment and adapt when services are implemented)
// fetchUser('user-123').then(user => user && console.log('Fetched via function:', user));
// createUser({ name: 'John Doe', email: 'john.doe@example.com' }).then(user => user && console.log('Created via function:', user));
```

### Direct Client Usage (Advanced)

While `apiClient` is recommended, you can also instantiate clients directly:

```typescript
import { RestClient, EndpointResolver } from '@portals/api-client';

const customRestClient = new RestClient(EndpointResolver.getApiBaseUrl());

// async function getSomeData() {
//   const data = await customRestClient.get<{ message: string }>('/some-endpoint');
//   console.log(data.message);
// }
```

## Development

- Build: `pnpm build`
- Watch mode: `pnpm dev`
- Test: `pnpm test`
- Lint: `pnpm lint`
- Clean: `pnpm clean`
- Generate Docs: `pnpm docs` (output to `docs/` directory)

## Testing

Tests are written using Jest and Mock Service Worker (MSW). Test files are located under `tests/` or `src/**/__tests__`.

Run tests with `pnpm test`.

## Contributing

Please follow the monorepo's contribution guidelines.

## Documentation

TypeDoc generated documentation can be found in the `docs/` directory after running `pnpm docs`.

Key modules:

- `clients/`: Core HTTP client implementations.
- `config/`: Configuration management (`EndpointResolver`, `ServiceRegistry`).
- `services/`: Business-logic specific service classes.
- `transformers/`: Data transformation utilities.
- `index.ts`: Main package exports, including the `apiClient` singleton.
