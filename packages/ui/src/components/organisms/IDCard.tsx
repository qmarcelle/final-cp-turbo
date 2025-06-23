'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';
import { Card } from '../molecules/Card/Card';
import { Avatar, AvatarImage, AvatarFallback } from '../atoms/Avatar/Avatar';
import { Button } from '../atoms/Button/Button';
import { Download, Share2 } from 'lucide-react';

const idCardVariants = cva(
  'relative overflow-hidden',
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-br from-primary/10 to-primary/5',
        blue: 'bg-gradient-to-br from-blue-500/10 to-blue-500/5',
        green: 'bg-gradient-to-br from-green-500/10 to-green-500/5',
        purple: 'bg-gradient-to-br from-purple-500/10 to-purple-500/5',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface IDCardProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Card>, 'variant'>,
    VariantProps<typeof idCardVariants> {
  name: string;
  memberId: string;
  planName: string;
  groupNumber?: string;
  effectiveDate: Date;
  photoUrl?: string;
  onDownload?: () => void;
  onShare?: () => void;
}

const IDCard = React.forwardRef<
  React.ElementRef<typeof Card>,
  IDCardProps
>(({
  className,
  variant,
  name,
  memberId,
  planName,
  groupNumber,
  effectiveDate,
  photoUrl,
  onDownload,
  onShare,
  ...props
}, ref) => {
  return (
    <Card
      ref={ref}
      className={cn(idCardVariants({ variant }), className)}
      {...props}
    >
      <div className="absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 transform rounded-full bg-primary/10" />
      <div className="absolute bottom-0 left-0 h-24 w-24 translate-y-6 -translate-x-6 transform rounded-full bg-primary/10" />

      <div className="relative p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={photoUrl} alt={name} />
              <AvatarFallback name={name} />
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{name}</h3>
              <p className="text-sm text-muted-foreground">
                Member ID: {memberId}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            {onShare && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onShare}
              >
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Share ID Card</span>
              </Button>
            )}
            {onDownload && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onDownload}
              >
                <Download className="h-4 w-4" />
                <span className="sr-only">Download ID Card</span>
              </Button>
            )}
          </div>
        </div>

        <div className="mt-6 grid gap-4 text-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-muted-foreground">Plan Name</p>
              <p className="font-medium">{planName}</p>
            </div>
            {groupNumber && (
              <div>
                <p className="text-muted-foreground">Group Number</p>
                <p className="font-medium">{groupNumber}</p>
              </div>
            )}
          </div>
          <div>
            <p className="text-muted-foreground">Effective Date</p>
            <p className="font-medium">
              {effectiveDate.toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
});

IDCard.displayName = 'IDCard';

export { IDCard }; 