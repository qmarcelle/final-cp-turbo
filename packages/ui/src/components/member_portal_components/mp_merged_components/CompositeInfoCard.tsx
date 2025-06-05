/**
 * MERGED COMPONENT
 * Consolidates functionality from composite components:
 * - ClaimItem
 * - ClaimsPageInformation
 * - AuthItem
 * - OnMyPlanItem
 * - DocumentInfoCard
 * - Various information display components
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils';
import { Card } from './Card';
import { Typography } from './Typography';
import { Flex } from './Layout';
import { Button } from './Button';
import { ChevronRight } from 'lucide-react';

// InfoCard variants
const infoCardVariants = cva(
  "overflow-hidden",
  {
    variants: {
      variant: {
        default: "",
        claim: "",
        auth: "",
        document: "",
        benefit: "",
        provider: "",
      },
      status: {
        approved: "border-green-500",
        pending: "border-yellow-500",
        denied: "border-red-500",
        completed: "border-blue-500",
        default: "",
      }
    },
    defaultVariants: {
      variant: "default",
      status: "default",
    },
  }
);

export interface CompositeInfoCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof infoCardVariants> {
  /** The title of the info card */
  title: React.ReactNode;
  /** Optional subtitle for additional context */
  subtitle?: React.ReactNode;
  /** Optional date for the item */
  date?: string | Date;
  /** Optional icon to display in the info card */
  icon?: React.ReactNode;
  /** Status of the item being displayed */
  status?: 'approved' | 'pending' | 'denied' | 'completed' | string;
  /** Primary action link */
  actionHref?: string;
  /** Action button text */
  actionText?: string;
  /** Action button onClick handler */
  onAction?: () => void;
  /** Key-value pairs to display as properties */
  properties?: {
    label: string;
    value: React.ReactNode;
  }[];
  /** Whether to show a navigation chevron */
  showChevron?: boolean;
}

/**
 * CompositeInfoCard component for displaying structured information in a card format
 */
export const CompositeInfoCard = React.forwardRef<HTMLDivElement, CompositeInfoCardProps>(
  ({ 
    className, 
    variant, 
    status,
    title,
    subtitle,
    date,
    icon,
    actionHref,
    actionText,
    onAction,
    properties = [],
    showChevron,
    children,
    ...props 
  }, ref) => {
    // Format date if it's a Date object
    const formattedDate = date instanceof Date 
      ? date.toLocaleDateString() 
      : date;

    // Generate status badge text
    const statusText = status && status !== 'default' 
      ? status.charAt(0).toUpperCase() + status.slice(1) 
      : null;
    
    return (
      <Card
        ref={ref}
        className={cn(
          infoCardVariants({ variant, status }),
          { "border-l-4": status && status !== 'default' },
          className
        )}
        {...props}
      >
        <Card.Header>
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-3">
              {icon && (
                <div className="shrink-0">
                  {icon}
                </div>
              )}
              <div>
                <Card.Title>{title}</Card.Title>
                {subtitle && (
                  <Typography variant="small" className="text-muted-foreground mt-1">
                    {subtitle}
                  </Typography>
                )}
              </div>
            </div>
            {formattedDate && (
              <Typography variant="small" className="text-muted-foreground">
                {formattedDate}
              </Typography>
            )}
            {statusText && (
              <div className={cn(
                "text-xs font-medium rounded-full px-2.5 py-1",
                status === "approved" && "bg-green-100 text-green-800",
                status === "pending" && "bg-yellow-100 text-yellow-800",
                status === "denied" && "bg-red-100 text-red-800",
                status === "completed" && "bg-blue-100 text-blue-800"
              )}>
                {statusText}
              </div>
            )}
          </div>
        </Card.Header>

        {(properties.length > 0 || children) && (
          <Card.Content>
            {properties.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                {properties.map((property, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <Typography variant="small" className="text-muted-foreground">
                      {property.label}:
                    </Typography>
                    <Typography variant="small" weight="medium">
                      {property.value}
                    </Typography>
                  </div>
                ))}
              </div>
            )}
            {children}
          </Card.Content>
        )}

        {(actionHref || actionText || onAction || showChevron) && (
          <Card.Footer>
            <div className="flex justify-between items-center w-full">
              {(actionHref || actionText || onAction) && (
                <Button 
                  href={actionHref} 
                  onClick={onAction}
                  variant="link" 
                  className="p-0 h-auto"
                >
                  {actionText || "View details"}
                </Button>
              )}
              {showChevron && (
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
          </Card.Footer>
        )}
      </Card>
    );
  }
);

CompositeInfoCard.displayName = "CompositeInfoCard";

// Card list container
export interface InfoCardListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * Container for multiple InfoCard components
 */
export const InfoCardList = React.forwardRef<HTMLDivElement, InfoCardListProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("space-y-4", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

InfoCardList.displayName = "InfoCardList";