'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';
import { Card } from '../molecules/Card/Card';
import { Badge } from '../atoms/Badge/Badge';
import { Button } from '../atoms/Button/Button';
import { format } from 'date-fns';

const claimCardVariants = cva(
  '',
  {
    variants: {
      variant: {
        default: '',
        pending: 'border-yellow-500/20',
        approved: 'border-green-500/20',
        denied: 'border-red-500/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface ClaimCardProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Card>, 'variant'>,
    VariantProps<typeof claimCardVariants> {
  claimId: string;
  status: 'pending' | 'approved' | 'denied';
  amount: number;
  date: Date;
  onViewDetails?: () => void;
}

const statusConfig = {
  pending: {
    label: 'Pending',
    variant: 'warning' as const,
  },
  approved: {
    label: 'Approved',
    variant: 'success' as const,
  },
  denied: {
    label: 'Denied',
    variant: 'destructive' as const,
  },
};

const ClaimCard = React.forwardRef<
  React.ElementRef<typeof Card>,
  ClaimCardProps
>(({
  className,
  variant = 'default',
  claimId,
  status,
  amount,
  date,
  onViewDetails,
  ...props
}, ref) => {
  const { label, variant: badgeVariant } = statusConfig[status];

  return (
    <Card
      ref={ref}
      className={cn(claimCardVariants({ variant }), className)}
      {...props}
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold">Claim #{claimId}</h3>
              <Badge variant={badgeVariant}>{label}</Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {format(date, 'PPP')}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">${amount.toFixed(2)}</p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end space-x-2">
          {onViewDetails && (
            <Button
              variant="default"
              size="sm"
              onClick={onViewDetails}
            >
              View Details
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
});

ClaimCard.displayName = 'ClaimCard';

export { ClaimCard }; 