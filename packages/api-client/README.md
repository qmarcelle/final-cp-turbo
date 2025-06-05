# @cp/api-client

API client library for Consumer Portals applications.

## Overview

This package provides a standardized way to communicate with backend APIs from portal applications. It's built on top of Axios and SWR, offering data fetching, caching, and error handling functionality.

## Features

- **HTTP Client**: Axios-based HTTP client with request/response interceptors
- **Data Fetching**: SWR hooks for efficient data fetching with caching
- **Error Handling**: Consistent error handling and reporting
- **Type Safety**: TypeScript interfaces for API responses
- **Authentication**: Automatic token handling and refresh
- **Request Transformation**: Consistent request formatting
- **Response Normalization**: Standardized response parsing

## Installation

```bash
# Install in a portal application
pnpm add @cp/api-client
```

## Usage

### Basic Data Fetching

```typescript
import { useQuery } from '@cp/api-client';

function UserProfile() {
  const { data, error, isLoading } = useQuery('/api/user/profile');
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.email}</p>
    </div>
  );
}
```

### Data Mutations

```typescript
import { useMutation, useQuery } from '@cp/api-client';

function ProfileEditor() {
  const { data, mutate } = useQuery('/api/user/profile');
  const { trigger, isMutating } = useMutation('/api/user/profile');
  
  const updateProfile = async (formData) => {
    try {
      // Optimistically update the UI
      mutate({ ...data, ...formData }, false);
      
      // Send the update to the server
      await trigger(formData, { method: 'PUT' });
      
      // Refresh data after successful mutation
      mutate();
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };
  
  // Component implementation
}
```

### Direct API Calls

```typescript
import { apiClient } from '@cp/api-client';

// GET request
const fetchUser = async (userId) => {
  const response = await apiClient.get(`/api/users/${userId}`);
  return response.data;
};

// POST request
const createUser = async (userData) => {
  const response = await apiClient.post('/api/users', userData);
  return response.data;
};

// PUT request
const updateUser = async (userId, userData) => {
  const response = await apiClient.put(`/api/users/${userId}`, userData);
  return response.data;
};

// DELETE request
const deleteUser = async (userId) => {
  const response = await apiClient.delete(`/api/users/${userId}`);
  return response.data;
};
```

### With TypeScript

```typescript
import { useQuery, useMutation } from '@cp/api-client';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

function UserProfile() {
  const { data, error } = useQuery<User>('/api/user/profile');
  const { trigger } = useMutation<User>('/api/user/profile');
  
  // Type-safe access to user data
  return data ? <div>Hello, {data.name}</div> : null;
}
```

## Configuration

The API client can be configured globally:

```typescript
// In your app's entry point
import { configureApiClient } from '@cp/api-client';

configureApiClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'X-App-Version': process.env.NEXT_PUBLIC_APP_VERSION,
  },
  loggerOptions: {
    level: 'info',
    enabled: process.env.NODE_ENV !== 'production',
  },
});
```

## API Reference

### Core Functions

#### `useQuery<T>(url, options?)`

React hook for data fetching with SWR.

**Options:**
- `method`: HTTP method (default: 'GET')
- `params`: URL parameters
- `headers`: Custom headers
- `body`: Request body
- `...swrOptions`: All SWR options

**Returns:**
- `data`: The fetched data
- `error`: Error object if the request failed
- `isLoading`: True during initial loading
- `isValidating`: True during revalidation
- `mutate`: Function to mutate the data

#### `useMutation<T>(url, options?)`

React hook for data mutations.

**Options:**
- `method`: HTTP method (default: 'POST')
- `headers`: Custom headers
- `onSuccess`: Callback after successful mutation
- `onError`: Callback after failed mutation

**Returns:**
- `trigger`: Function to trigger the mutation
- `isMutating`: True during mutation
- `error`: Error object if the mutation failed
- `reset`: Function to reset the mutation state

#### `apiClient`

Axios instance for direct API calls.

- `apiClient.get(url, config?)`
- `apiClient.post(url, data?, config?)`
- `apiClient.put(url, data?, config?)`
- `apiClient.delete(url, config?)`
- `apiClient.request(config)`

#### `configureApiClient(config)`

Configure the API client globally.

**Config:**
- `baseURL`: Base URL for all requests
- `timeout`: Request timeout in milliseconds
- `headers`: Default headers
- `interceptors`: Custom request/response interceptors
- `loggerOptions`: Options for request/response logging

## Error Handling

The API client provides standardized error handling:

```typescript
import { useQuery, ApiError } from '@cp/api-client';

function UserProfile() {
  const { data, error } = useQuery('/api/user/profile');
  
  if (error) {
    if (error instanceof ApiError) {
      if (error.status === 401) {
        return <div>Please log in to view your profile</div>;
      }
      if (error.status === 403) {
        return <div>You don't have permission to view this profile</div>;
      }
      return <div>Error: {error.message}</div>;
    }
    return <div>An unexpected error occurred</div>;
  }
  
  // Render profile
}
```

## Integration with Logger

This package integrates with `@cp/logger` for request/response logging:

```typescript
import { configureApiClient } from '@cp/api-client';
import { createLogger } from '@cp/logger';

const logger = createLogger({ name: 'api' });

configureApiClient({
  loggerOptions: {
    logger, // Use the custom logger
    level: 'debug',
    includeTiming: true,
    includeHeaders: false,
  },
});
```

## Best Practices

### Data Fetching

- Use `useQuery` for data that needs to be displayed
- Use `useMutation` for data that needs to be modified
- Use `apiClient` directly for one-off API calls

### Error Handling

- Always handle errors in components that use API calls
- Use specific error types for different error conditions
- Provide user-friendly error messages

### Performance

- Use SWR's caching capabilities for frequently accessed data
- Invalidate cache appropriately after mutations
- Use pagination for large data sets

## Contributing

Please refer to the main repository's contributing guidelines.

## License

Proprietary and Confidential 