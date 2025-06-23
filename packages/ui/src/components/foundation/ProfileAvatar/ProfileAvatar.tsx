'use client'

import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cn } from '../../../utils'
import type { ProfileAvatarProps } from '@/types/components'

const avatarSizes = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
}

export const ProfileAvatar = React.forwardRef<HTMLSpanElement, ProfileAvatarProps>(
  ({ user, size = 'md', fallback, className, ...props }, ref) => {
    // Generate fallback from user's name if not provided
    const defaultFallback = React.useMemo(() => {
      if (fallback) return fallback
      if (!user.firstName && !user.lastName) return '?'
      return `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`
    }, [fallback, user.firstName, user.lastName])

    return (
      <AvatarPrimitive.Root
        ref={ref}
        className={cn(
          'relative flex shrink-0 overflow-hidden rounded-full',
          avatarSizes[size],
          className
        )}
        {...props}
      >
        {user.avatarUrl ? (
          <AvatarPrimitive.Image
            src={user.avatarUrl}
            alt={`${user.firstName} ${user.lastName}`}
            className="h-full w-full object-cover"
          />
        ) : null}
        <AvatarPrimitive.Fallback
          className={cn(
            'flex h-full w-full items-center justify-center rounded-full bg-muted',
            !user.avatarUrl && 'border-2 border-border'
          )}
          delayMs={600}
        >
          <span className="font-medium text-muted-foreground">
            {defaultFallback}
          </span>
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>
    )
  }
)

ProfileAvatar.displayName = 'ProfileAvatar' 