/**
 * MERGED COMPONENT
 * Consolidates functionality from:
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

// InfoCard variants
const infoCardVariants = cva(
  "rounded-md overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-white border",
        claim: "border-l-4 border-l-blue-500",
        auth: "border-l-4 border-l-green-500",
        document: "border-l-4 border-l-amber-500",
        error: "border-l-4 border-l-red-500",
        warning: "border-l-4 border-l-yellow-500",
      },
      size: {
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
      },
      status: {
        approved: "bg-green-50",
        pending: "bg-yellow-50",
        denied: "bg-red-50",
        completed: "bg-blue-50",
        default: "",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      status: "default",
    },
  }
);

export interface InfoCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof infoCardVariants>, 'status'> {
  /** The title of the info card */
  title: React.ReactNode;
  /** Optional subtitle for additional context */
  subtitle?: React.ReactNode;
  /** Optional icon to display in the info card */
  icon?: React.ReactNode;
  /** Status of the item being displayed */
  status?: 'approved' | 'pending' | 'denied' | 'completed' | string;
  /** Whether to display the item with a compact layout */
  isCompact?: boolean;
  /** Optional action buttons or links */
  actions?: React.ReactNode;
  /** Main content of the info card */
  children?: React.ReactNode;
}

/**
 * InfoCard component for displaying structured information
 */
export const InfoCard = React.forwardRef<HTMLDivElement, InfoCardProps>(
  ({ 
    className, 
    variant, 
    size,
    title,
    subtitle,
    icon,
    status = 'default',
    isCompact = false,
    actions,
    children,
    ...props 
  }, ref) => {
    // Normalize status to match the variant options
    const normalizedStatus = (
      status === 'approved' || 
      status === 'pending' || 
      status === 'denied' || 
      status === 'completed'
    ) ? status : 'default';
    
    return (
      <div
        ref={ref}
        className={cn(
          infoCardVariants({ 
            variant, 
            size,
            status: normalizedStatus as any,
          }),
          isCompact ? "flex items-center" : "",
          className
        )}
        {...props}
      >
        <div className={
          isCompact 
            ? "flex items-center justify-between w-full" 
            : ""
        }>
          <div className={cn(
            "flex",
            isCompact ? "items-center gap-3" : "flex-col gap-2"
          )}>
            {/* Icon and Title container */}
            <Flex 
              align="center" 
              gap={3} 
              className={cn(
                isCompact ? "flex-grow" : "w-full justify-between"
              )}
            >
              {icon && (
                <div className="shrink-0">
                  {icon}
                </div>
              )}
              <div className={isCompact ? "" : "w-full"}>
                <Flex direction={isCompact ? "row" : "column"} gap={isCompact ? 2 : 1} align={isCompact ? "center" : "start"}>
                  <Typography 
                    variant={isCompact ? "p" : "h4"} 
                    weight="semibold"
                    className="text-gray-900"
                  >
                    {title}
                  </Typography>
                  
                  {subtitle && (
                    <Typography 
                      variant="small"
                      className="text-gray-500"
                    >
                      {subtitle}
                    </Typography>
                  )}
                </Flex>
              </div>
              
              {status && status !== 'default' && (
                <div className={
                  cn(
                    "text-xs font-medium rounded-full px-2.5 py-1",
                    status === "approved" && "bg-green-100 text-green-800",
                    status === "pending" && "bg-yellow-100 text-yellow-800",
                    status === "denied" && "bg-red-100 text-red-800",
                    status === "completed" && "bg-blue-100 text-blue-800",
                    !['approved', 'pending', 'denied', 'completed'].includes(status) && "bg-gray-100 text-gray-800"
                  )
                }>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </div>
              )}
            </Flex>
            
            {/* Child content */}
            {!isCompact && children && (
              <div className="mt-2 w-full">
                {children}
              </div>
            )}
          </div>
          
          {/* Actions */}
          {actions && (
            <div className={cn(
              "flex",
              isCompact ? "ml-auto pl-4" : "mt-4 justify-end"
            )}>
              {actions}
            </div>
          )}
        </div>
      </div>
    );
  }
);

InfoCard.displayName = "InfoCard";

// Info list variants
const infoListVariants = cva(
  "divide-y",
  {
    variants: {
      spacing: {
        default: "divide-y",
        tight: "divide-y-0",
      },
    },
    defaultVariants: {
      spacing: "default",
    },
  }
);

export interface InfoListProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof infoListVariants> {
  children: React.ReactNode;
}

/**
 * Container for multiple InfoCard components
 */
export const InfoList = React.forwardRef<HTMLDivElement, InfoListProps>(
  ({ className, spacing, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(infoListVariants({ spacing }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

InfoList.displayName = "InfoList";

export interface InfoItemProps {
  /** Label for the info item */
  label: React.ReactNode;
  /** Value for the info item */
  value: React.ReactNode;
  /** Optional icon */
  icon?: React.ReactNode;
}

/**
 * Component for displaying labeled information in a key-value format
 */
export const InfoItem: React.FC<InfoItemProps> = ({ 
  label, 
  value,
  icon
}) => {
  return (
    <Flex direction="row" className="py-1" justify="between" align="center">
      <Flex align="center" gap={2}>
        {icon && <span className="text-gray-500">{icon}</span>}
        <Typography variant="small" className="text-gray-500">
          {label}
        </Typography>
      </Flex>
      <Typography variant="small" weight="medium">
        {value}
      </Typography>
    </Flex>
  );
};

InfoItem.displayName = "InfoItem";