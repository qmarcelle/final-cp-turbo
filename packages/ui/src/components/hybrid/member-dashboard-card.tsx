import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '../ui/button';
import { HybridComponentWrapper } from '@portals/sitecore-integration/src/components/hybrid-component-wrapper';
import type { HybridComponentProps } from '@portals/sitecore-integration/src/types/integration';

interface MemberDashboardCardFields {
  title?: { value: string };
  subtitle?: { value: string };
  ctaText?: { value: string };
  showBenefits?: { value: boolean };
}

interface MemberDashboardCardProps extends HybridComponentProps<{
  member?: any;
  eligibility?: any;
}> {
  fields?: MemberDashboardCardFields;
  memberId?: string;
}

export function MemberDashboardCard(props: MemberDashboardCardProps) {
  return (
    <HybridComponentWrapper
      {...props}
      portalQuery={{
        enabled: Boolean(props.memberId),
        memberId: props.memberId,
      }}
    >
      {(hybridProps) => <MemberDashboardCardContent {...hybridProps} />}
    </HybridComponentWrapper>
  );
}

function MemberDashboardCardContent({
  fields,
  params,
  rendering,
  portalData,
  portalError,
  isLoading,
}: HybridComponentProps<{ member?: any; eligibility?: any }> & {
  fields?: MemberDashboardCardFields;
}) {
  // Data composition: Sitecore content + Portal data
  const content = {
    title: fields?.title?.value || 'Member Dashboard',
    subtitle: fields?.subtitle?.value || 'Your Benefits Overview',
    ctaText: fields?.ctaText?.value || 'View Details',
    showBenefits: fields?.showBenefits?.value ?? true,
  };

  // Handle loading state
  if (isLoading) {
    return (
      <Card data-sitecore-uid={rendering?.uid}>
        <CardHeader>
          <CardTitle>{content.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Handle error state (graceful degradation)
  if (portalError) {
    console.warn('Portal data unavailable, using Sitecore fallback:', portalError);
  }

  // Render with composed data
  const member = portalData?.member;
  const eligibility = portalData?.eligibility;

  return (
    <Card 
      className="w-full"
      data-sitecore-uid={rendering?.uid}
      data-portal-status={portalError ? 'error' : 'success'}
    >
      <CardHeader>
        <CardTitle>{content.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{content.subtitle}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {member && (
          <div>
            <p className="font-semibold">{member.firstName} {member.lastName}</p>
            <p className="text-sm text-muted-foreground">ID: {member.subscriberId}</p>
          </div>
        )}

        {content.showBenefits && eligibility?.plans && (
          <div>
            <h4 className="font-medium mb-2">Active Plans</h4>
            <ul className="space-y-1">
              {eligibility.plans.map((plan: any) => (
                <li key={plan.planId} className="text-sm">
                  {plan.planName} ({plan.productType})
                </li>
              ))}
            </ul>
          </div>
        )}

        {!member && !portalError && (
          <p className="text-sm text-muted-foreground">
            {/* Fallback content from Sitecore */}
            Member information will appear here when logged in.
          </p>
        )}
      </CardContent>
      
      {member && (
        <div className="p-6 pt-0">
          <Button asChild>
            <a href={`/portal/member/${member.memberCk}`}>
              {content.ctaText}
            </a>
          </Button>
        </div>
      )}
    </Card>
  );
} 