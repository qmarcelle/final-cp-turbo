import { Suspense } from 'react';
import { MemberDashboardCard } from '@portals/ui/hybrid';
import { getSitecoreLayoutData } from '@portals/sitecore-integration';
import { getCurrentUser } from '@/lib/auth';

export default async function HybridDashboardPage() {
  // Server-side data fetching
  const [layoutData, user] = await Promise.all([
    getSitecoreLayoutData('/dashboard'),
    getCurrentUser(),
  ]);

  // Extract Sitecore component data
  const dashboardCardData = layoutData?.sitecore?.route?.placeholders?.main?.find(
    (component: any) => component.componentName === 'MemberDashboardCard'
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Member Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Suspense fallback={<DashboardCardSkeleton />}>
          <MemberDashboardCard
            fields={dashboardCardData?.fields}
            params={dashboardCardData?.params}
            rendering={dashboardCardData?.rendering}
            memberId={user?.memberId}
          />
        </Suspense>
        
        {/* Other hybrid components */}
      </div>
    </div>
  );
}

function DashboardCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 h-48 rounded-lg"></div>
    </div>
  );
} 