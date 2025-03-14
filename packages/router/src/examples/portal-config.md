# Portal Configuration Examples

This document shows how to configure each portal to use a specific base path.

## 1. Configure `next.config.js`

For each portal, you'll need to set the base path in the Next.js configuration:

### Member Portal

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '/member',
  // Other configuration...
}

module.exports = nextConfig
```

### Broker Portal

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '/broker',
  // Other configuration...
}

module.exports = nextConfig
```

### Employer Portal

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '/employer',
  // Other configuration...
}

module.exports = nextConfig
```

## 2. Set Environment Variables

Add the base path to your `.env` files:

### Member Portal (.env.local)

```env
NEXT_PUBLIC_BASE_PATH=/member
```

### Broker Portal (.env.local)

```env
NEXT_PUBLIC_BASE_PATH=/broker
```

### Employer Portal (.env.local)

```env
NEXT_PUBLIC_BASE_PATH=/employer
```

## 3. Configure OpenShift Routes

When deploying to OpenShift, configure the routes with path-based routing:

### Example OpenShift Route Configuration

```yaml
apiVersion: route.openshift.io/v1
kind: Route
metadata:
  name: member-portal
spec:
  host: consumer-portals.example.com
  path: /member
  to:
    kind: Service
    name: member-portal-service
  port:
    targetPort: http
---
apiVersion: route.openshift.io/v1
kind: Route
metadata:
  name: broker-portal
spec:
  host: consumer-portals.example.com
  path: /broker
  to:
    kind: Service
    name: broker-portal-service
  port:
    targetPort: http
---
apiVersion: route.openshift.io/v1
kind: Route
metadata:
  name: employer-portal
spec:
  host: consumer-portals.example.com
  path: /employer
  to:
    kind: Service
    name: employer-portal-service
  port:
    targetPort: http
```

## 4. Usage in Components

The `@cp/router` package handles the base paths automatically, so your components can use the routes without worrying about the base path:

```tsx
import { ROUTES, useNavigation } from '@cp/router';

function Navigation() {
  const { navigate, isActive } = useNavigation();
  
  return (
    <nav>
      <ul>
        <li className={isActive(ROUTES.AUTH.DASHBOARD) ? 'active' : ''}>
          <a href="#" onClick={() => navigate(ROUTES.AUTH.DASHBOARD)}>Dashboard</a>
        </li>
        <li className={isActive(ROUTES.AUTH.CLAIMS) ? 'active' : ''}>
          <a href="#" onClick={() => navigate(ROUTES.AUTH.CLAIMS)}>Claims</a>
        </li>
        {/* More navigation items... */}
      </ul>
    </nav>
  );
}
```

## 5. Handling Assets and Static Files

For static files like images or other assets, make sure to use the `basePath` in your image paths:

```tsx
import { useBasePath } from '@cp/router';
import Image from 'next/image';

function Logo() {
  const basePath = useBasePath();
  
  return (
    <Image 
      src={`${basePath}/images/logo.png`} 
      alt="Logo" 
      width={200} 
      height={50} 
    />
  );
}
```

## 6. API Routes

For API routes, the base path is automatically applied by Next.js. For example, if your API route is defined at:

```typescript
/app/api/user/route.ts
```

It will be available at:

- Member Portal: `/member/api/user`
- Broker Portal: `/broker/api/user`
- Employer Portal: `/employer/api/user`
