# 🎯 Next.js 15 + React 19 with Sitecore Migration Strategy

## Sitecore-Ready Component Architecture

### **1. Content-Driven Component Pattern**

// Enhanced component pattern for Sitecore integration
interface SitecoreComponentProps {
  fields?: Record<string, any>
  params?: Record<string, string>
  rendering?: {
    uid?: string
    componentName?: string
    dataSource?: string
  }
  [key: string]: any
}

// Base pattern for all components
export interface ComponentProps extends SitecoreComponentProps {
  children?: React.ReactNode
  className?: string
}

// Example: Button component ready for Sitecore
export const Button = ({
  fields,
  params,
  rendering,
  children,
  variant = 'default',
  ...props
}: ComponentProps & ButtonProps) => {
  // Sitecore content fallback pattern
  const content = fields?.text?.value || children
  const linkField = fields?.link?.value
  const ctaVariant = params?.variant || variant

  return (
    <button 
      className={cn(buttonVariants({ variant: ctaVariant }))}
      data-sitecore-uid={rendering?.uid}
      {...props}
    >
      {content}
    </button>
  )
}
```

### **2. Layout Patterns for Sitecore Page Composition**
```typescript
// Sitecore-compatible layout structure
interface PageLayoutProps extends SitecoreComponentProps {
  placeholders?: {
    header?: React.ReactNode[]
    main?: React.ReactNode[]
    sidebar?: React.ReactNode[]
    footer?: React.ReactNode[]
  }
}

export const PageLayout = ({ 
  fields, 
  placeholders, 
  rendering 
}: PageLayoutProps) => {
  return (
    <div 
      className="min-h-screen flex flex-col"
      data-sitecore-page={rendering?.uid}
    >
      {/* Sitecore Header Placeholder */}
      <header className="sticky top-0 z-50">
        <PlaceholderRenderer 
          name="header"
          components={placeholders?.header}
        />
      </header>

      <div className="flex-1 flex">
        {/* Main Content Placeholder */}
        <main className="flex-1">
          <PlaceholderRenderer 
            name="main"
            components={placeholders?.main}
          />
        </main>

        {/* Conditional Sidebar Placeholder */}
        {placeholders?.sidebar && (
          <aside className="w-80">
            <PlaceholderRenderer 
              name="sidebar"
              components={placeholders?.sidebar}
            />
          </aside>
        )}
      </div>

      {/* Footer Placeholder */}
      <footer>
        <PlaceholderRenderer 
          name="footer"
          components={placeholders?.footer}
        />
      </footer>
    </div>
  )
}
```

## **3. Sitecore Component Registration System**
```typescript
// components/sitecore/component-factory.tsx
import { ComponentMapping } from '@sitecore-jss/sitecore-jss-nextjs'

// Register all UI components for Sitecore
const componentFactory = new Map([
  // Foundation Components
  ['Button', Button],
  ['Card', Card],
  ['Input', Input],
  ['Select', Select],
  
  // Enhanced Components  
  ['DataTable', DataTable],
  ['CommandPalette', CommandPalette],
  ['DatePicker', DatePicker],
  
  // Pattern Components
  ['HeaderNavigation', HeaderNavigation],
  ['UserProfileMenu', UserProfileMenu],
  ['PageShell', PageShell],
  
  // Domain Components
  ['MemberCard', MemberCard],
  ['ClaimsStatus', ClaimsStatus],
  ['BenefitsNavigator', BenefitsNavigator],
])

// Sitecore component wrapper with error boundaries
export const SitecoreComponentWrapper = ({ 
  componentName, 
  ...props 
}: SitecoreComponentProps & { componentName: string }) => {
  const Component = componentFactory.get(componentName)
  
  if (!Component) {
    console.warn(`Component ${componentName} not found in factory`)
    return <div>Component not found: {componentName}</div>
  }

  return (
    <ErrorBoundary fallback={<ComponentError name={componentName} />}>
      <Component {...props} />
    </ErrorBoundary>
  )
}

// Register with Sitecore JSS
ComponentMapping.set('Button', Button)
ComponentMapping.set('Card', Card)
// ... register all components
```

## **4. Route Structure for Sitecore Integration**
```diff
app/
├── (sitecore)/                    # Sitecore-managed routes
│   ├── [[...path]]/              # Catch-all for Sitecore pages
│   │   └── page.tsx              # Sitecore page resolver
│   ├── components/               # Sitecore component previews
│   │   └── [component]/
│   │       └── page.tsx
│   └── layout.tsx               # Sitecore-aware layout
├── (portal)/                     # Authenticated portal routes
│   ├── (dashboard)/             
│   │   ├── page.tsx             # React 19 + Sitecore hybrid
│   │   └── layout.tsx
│   └── (claims)/
├── (public)/                     # Public marketing (Sitecore)
│   ├── [[...slug]]/             # Sitecore marketing pages
│   └── layout.tsx
└── api/
    ├── sitecore/                # Sitecore integration endpoints
    │   ├── layout/[...path]/    # Layout service
    │   ├── dictionary/[...path]/ # Dictionary service
    │   └── editing/             # Experience Editor
    └── portal/                  # Portal-specific APIs
```

## **5. Content-Aware Component Patterns**
```typescript
// Domain component with Sitecore content integration
export const MemberCard = ({ 
  fields,
  params,
  rendering,
  memberData, // Portal API data
  ...props 
}: ComponentProps & { memberData?: MemberData }) => {
  // Hybrid content strategy: Sitecore + Portal API
  const content = {
    title: fields?.title?.value || 'Member Information',
    subtitle: fields?.subtitle?.value || 'Your Benefits Overview',
    ctaText: fields?.ctaText?.value || 'View Details',
    // Portal-specific data takes precedence for dynamic content
    memberName: memberData?.name || fields?.memberName?.value,
    planType: memberData?.planType || fields?.defaultPlan?.value,
  }

  // Personalization parameters from Sitecore
  const variant = params?.variant || 'default'
  const showBenefits = params?.showBenefits === 'true'
  
  return (
    <Card 
      variant={variant}
      data-sitecore-uid={rendering?.uid}
      data-personalization={params?.personalization}
      {...props}
    >
      <CardHeader>
        <CardTitle>{content.title}</CardTitle>
        <CardDescription>{content.subtitle}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="font-semibold">{content.memberName}</p>
            <p className="text-sm text-muted-foreground">{content.planType}</p>
          </div>
          
          {showBenefits && memberData?.benefits && (
            <BenefitsList benefits={memberData.benefits} />
          )}
        </div>
      </CardContent>
      
      <CardFooter>
        <Button asChild>
          <Link href={`/portal/member/${memberData?.id}`}>
            {content.ctaText}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
```

## **6. React 19 + Sitecore Data Fetching**
```typescript
// Hybrid data strategy using React 19 patterns
'use client'
import { use } from 'react'
import { useActionState } from 'react'

// Sitecore page with React 19 integration
export default function SitecorePage({ 
  layoutData, // From Sitecore Layout Service
  componentData // From Sitecore components
}) {
  // React 19: Use promise-based data fetching
  const portalData = use(fetchPortalData())
  
  // React 19: Enhanced form handling for Sitecore forms
  const [formState, formAction] = useActionState(async (prev, formData) => {
    // Submit to both Sitecore and Portal APIs
    const sitecore = await submitToSitecore(formData)
    const portal = await submitToPortal(formData)
    
    return { sitecore, portal, success: true }
  })

  return (
    <SitecorePageWrapper layoutData={layoutData}>
      {/* Sitecore-managed content areas */}
      <PlaceholderRenderer 
        name="hero"
        components={componentData.hero}
      />
      
      {/* Hybrid portal/sitecore content */}
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<MemberCardSkeleton />}>
          <MemberCard 
            fields={componentData.memberCard}
            memberData={portalData.member}
          />
        </Suspense>
        
        {/* React 19 form integration */}
        <form action={formAction} className="mt-8">
          <SitecoreForm 
            fields={componentData.contactForm}
            state={formState}
          />
        </form>
      </div>
    </SitecorePageWrapper>
  )
}
```

## **7. Sitecore-Ready Component Library Structure**
```typescript
// Update your UI package structure for Sitecore
packages/ui/src/
├── components/
│   ├── ui/                      # Base shadcn components
│   │   ├── button/
│   │   │   ├── button.tsx       # Sitecore-aware
│   │   │   ├── button.sitecore.tsx # Sitecore wrapper
│   │   │   └── button.stories.tsx
│   │   └── ...
│   ├── enhanced/                # Enhanced components
│   ├── patterns/                # Layout patterns  
│   └── domain/                  # Business components
├── sitecore/
│   ├── component-factory.tsx    # Component registration
│   ├── placeholder-renderer.tsx # Sitecore placeholder logic
│   ├── layout-service.ts        # Layout Service client
│   └── types.ts                 # Sitecore TypeScript types
└── lib/
    ├── sitecore-utils.ts        # Sitecore helper functions
    └── content-helpers.ts       # Content processing utilities
```

## **8. Migration Timeline & Strategy**

### **Phase 1: Foundation (Months 1-2)**
```bash
✅ Update all base components to accept Sitecore props
✅ Implement component factory registration
✅ Create Sitecore-compatible route structure
✅ Setup hybrid data fetching patterns
```

### **Phase 2: Content Integration (Months 3-4)**
```bash
🔄 Migrate marketing pages to Sitecore
🔄 Implement placeholder rendering system
🔄 Setup Sitecore Experience Editor integration
🔄 Create content-driven component variants
```

### **Phase 3: Personalization (Months 5-6)**
```bash
🆕 Implement Sitecore personalization rules
🆕 A/B testing component variants
🆕 Dynamic content injection
🆕 Analytics and tracking integration
```

## **9. Performance Considerations**
```typescript
// Optimize for both Next.js 15 and Sitecore
// Static generation for marketing content
export async function generateStaticParams() {
  const sitecoreRoutes = await getSitecoreRoutes()
  return sitecoreRoutes.map(route => ({ path: route.path.split('/') }))
}

// Hybrid caching strategy
const getSitecoreData = unstable_cache(
  async (path: string) => {
    return await fetchSitecoreLayout(path)
  },
  ['sitecore-layout'],
  { 
    revalidate: 300, // 5 minutes for marketing content
    tags: ['sitecore']
  }
)
```

## **10. Testing Strategy for Sitecore Components**
```typescript
// Sitecore component testing
test('MemberCard renders with Sitecore data', () => {
  const mockSitecoreFields = {
    title: { value: 'Test Title' },
    subtitle: { value: 'Test Subtitle' }
  }
  
  const mockRendering = {
    uid: 'test-uid',
    componentName: 'MemberCard'
  }
  
  render(
    <MemberCard 
      fields={mockSitecoreFields}
      rendering={mockRendering}
      memberData={mockPortalData}
    />
  )
  
  expect(screen.getByText('Test Title')).toBeInTheDocument()
  expect(screen.getByTestId('sitecore-component')).toHaveAttribute(
    'data-sitecore-uid', 
    'test-uid'
  )
})
```