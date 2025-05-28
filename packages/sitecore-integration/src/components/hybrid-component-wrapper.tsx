'use client';

import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { trpcReact as trpc } from 'api-client';
import type { HybridComponentProps, SitecoreComponentProps } from '../types/integration';

interface HybridComponentWrapperProps extends SitecoreComponentProps {
  children: (props: HybridComponentProps) => React.ReactNode;
  portalQuery?: {
    enabled?: boolean;
    memberId?: string;
    groupId?: string;
    queryKey?: string;
  };
  fallback?: React.ReactNode;
  errorFallback?: React.ComponentType<{ error: Error }>;
}

export function HybridComponentWrapper({
  children,
  portalQuery,
  fallback = <div>Loading...</div>,
  errorFallback: ErrorFallback = DefaultErrorFallback,
  ...sitecoreProps
}: HybridComponentWrapperProps) {
  return (
    <ErrorBoundary fallback={ErrorFallback}>
      <Suspense fallback={fallback}>
        <HybridDataLoader 
          sitecoreProps={sitecoreProps}
          portalQuery={portalQuery}
        >
          {children}
        </HybridDataLoader>
      </Suspense>
    </ErrorBoundary>
  );
}

function HybridDataLoader({
  sitecoreProps,
  portalQuery,
  children,
}: {
  sitecoreProps: SitecoreComponentProps;
  portalQuery?: HybridComponentWrapperProps['portalQuery'];
  children: (props: HybridComponentProps) => React.ReactNode;
}) {
  // Conditionally fetch portal data based on query configuration
  const memberQuery = trpc.member.getMember.useQuery(
    {
      lookup: 'byMemberCk',
      memberId: portalQuery?.memberId || '',
      context: 'employer',
    },
    {
      enabled: Boolean(portalQuery?.enabled && portalQuery?.memberId),
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  const eligibilityQuery = trpc.member.getEligibility.useQuery(
    {
      lookup: 'byMemberCk',
      memberId: portalQuery?.memberId || '',
      context: 'employer',
    },
    {
      enabled: Boolean(portalQuery?.enabled && portalQuery?.memberId && memberQuery.data),
      staleTime: 5 * 60 * 1000,
    }
  );

  // Compose portal data
  const portalData = {
    member: memberQuery.data,
    eligibility: eligibilityQuery.data,
  };

  const isLoading = memberQuery.isLoading || eligibilityQuery.isLoading;
  const error = memberQuery.error || eligibilityQuery.error;

  return children({
    ...sitecoreProps,
    portalData,
    portalError: error ? error : undefined,
    isLoading,
  });
}

function DefaultErrorFallback({ error }: { error: Error }) {
  return (
    <div className="p-4 border border-red-200 rounded-md bg-red-50">
      <p className="text-red-800">Component failed to load: {error.message}</p>
    </div>
  );
} 