# 🚀 Enhanced Next.js 15/React 19 + shadcn/ui Strategy

Based on current best practices, here are the valuable additions for your Turborepo + shadcn/ui implementation:

## 📐 **Enhanced Architecture Patterns**

### **1. Advanced pnpm Workspace Configuration**### **2. Enhanced Turborepo Configuration**### **3. Radix Version Management Strategy**### **4. React 19 Enhanced Component Patterns**### **5. Enhanced Package Scripts & Tooling**## 🎯 **Key Valuable Additions from Research**

### **1. pnpm Catalogs for Version Management**
The latest pnpm v9.5+ introduces **catalogs** - a game-changing feature that allows you to define dependency version ranges as reusable constants. This is perfect for your copy-paste shadcn approach:

```yaml
# pnpm-workspace.yaml
catalog:
  "@radix-ui/react-dialog": "^1.1.2"  # Pin specific versions
  "@radix-ui/react-select": "^2.1.2"   # Control Radix upgrades
```

**Benefits:**
- **Centralized version control** for all Radix packages
- **Selective updates** - upgrade specific components when ready
- **Consistency** across all workspace packages

### **2. Enhanced Turborepo Tasks for UI Management**
Turborepo's latest versions support more granular task dependencies and input tracking. Add these tasks to your `turbo.json`:

```json
{
  "ui:add": { "cache": false },
  "ui:update": { "dependsOn": ["ui:add"] },
  "ui:validate": { "inputs": ["components.json", "packages/ui/src/**"] }
}
```

### **3. React 19 forwardRef Migration Strategy**
React 19 deprecates forwardRef, and shadcn/ui components need updates. Your copy-paste approach is **perfect** here - you can modify components directly:

```typescript
// OLD (React 18)
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants(), className)} {...props} />
  )
)

// NEW (React 19)
interface ButtonProps {
  ref?: React.Ref<HTMLButtonElement>
  // ... other props
}

const Button = ({ className, ref, ...props }: ButtonProps) => (
  <button ref={ref} className={cn(buttonVariants(), className)} {...props} />
)
```

### **4. Workspace Boundary Management**
Turborepo best practices emphasize avoiding `../` imports across package boundaries. Structure your imports properly:

```typescript
// ✅ CORRECT
import { Button } from '@portals/ui/components/button'

// ❌ WRONG  
import { Button } from '../../packages/ui/src/components/button'
```

### **5. Partial Prerendering Support**
Next.js 15's partial prerendering requires specific Turborepo output configuration:

```json
{
  "build": {
    "outputs": [
      ".next/**",
      ".next/partial-prerender/**"  // New for Next.js 15
    ]
  }
}
```

### **6. Component Registry System**
Managing shadcn/ui updates is challenging with the copy-paste approach. The component management script I created addresses this by:

- **Tracking** which Radix versions each component uses
- **Validating** compatibility before updates
- **Selective updates** of specific components
- **Version pinning** for stability

### **7. Advanced pnpm Workspace Features**
pnpm's strict dependency resolution catches bugs that npm/yarn miss. Use these patterns:

```json
// workspace:* for internal packages
"dependencies": {
  "@portals/ui": "workspace:*"
}

// packageExtensions for React 19 compatibility
"packageExtensions": {
  "*": {
    "peerDependenciesMeta": {
      "react": { "optional": false }
    }
  }
}
```

## 🚀 **Implementation Recommendations**

### **Phase 1: Foundation Setup**
1. **Implement pnpm catalogs** for Radix version control
2. **Add component registry system** for tracking changes
3. **Update Turborepo configuration** with new task definitions
4. **Setup React 19 patterns** in your component library

### **Phase 2: Component Migration**
1. **Use the copy-paste approach** with version control
2. **Implement component validation** before deployment
3. **Create update scripts** for selective component updates
4. **Document customizations** for future maintenance

### **Phase 3: Sitecore Preparation**
1. **Implement hybrid component patterns** (static + CMS)
2. **Setup route group architecture** for content vs app routes
3. **Create component factory system** for Sitecore integration
4. **Test partial prerendering** with dynamic content

This approach gives you **maximum control** over your component library while leveraging the latest Next.js 15/React 19 features and preparing for Sitecore migration. The copy-paste philosophy aligns perfectly with your need to customize Radix versions and maintain long-term stability.