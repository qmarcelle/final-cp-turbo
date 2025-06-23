import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cn } from '../../../lib/utils'

const avatarSizes = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
} as const

export type AvatarSize = keyof typeof avatarSizes;

export interface AvatarProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  size?: AvatarSize;
}

export interface AvatarImageProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> {}

export interface AvatarFallbackProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> {
  name?: string;
}

export interface ProfileAvatarProps extends Omit<AvatarProps, 'children'> {
  user: {
    firstName?: string;
    lastName?: string;
    avatarUrl?: string;
  };
  fallback?: string;
}

const getInitials = (firstName?: string, lastName?: string): string => {
  if (!firstName && !lastName) return '?'
  return `${firstName?.[0] || ''}${lastName?.[0] || ''}`
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size = 'md', ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex shrink-0 overflow-hidden rounded-full',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'transition-all duration-200 ease-in-out',
      avatarSizes[size],
      className
    )}
    {...props}
  />
))

Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  AvatarImageProps
>(({ className, alt, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    alt={alt}
    className={cn(
      'aspect-square h-full w-full object-cover',
      'transition-opacity duration-300 ease-in-out',
      className
    )}
    {...props}
  />
))

AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>(({ className, name, children, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full',
      'bg-muted text-muted-foreground font-medium',
      'border-2 border-border',
      'transition-colors duration-200',
      className
    )}
    delayMs={600}
    {...props}
  >
    {children || (name ? getInitials(name.split(' ')[0], name.split(' ')[1]) : null)}
  </AvatarPrimitive.Fallback>
))

AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

const ProfileAvatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  ProfileAvatarProps
>(({ user, size = 'md', fallback, className, ...props }, ref) => {
  // Generate fallback from user's name if not provided
  const defaultFallback = React.useMemo(() => {
    if (fallback) return fallback
    return getInitials(user.firstName, user.lastName)
  }, [fallback, user.firstName, user.lastName])

  return (
    <Avatar ref={ref} size={size} className={className} {...props}>
      {user.avatarUrl && (
        <AvatarImage
          src={user.avatarUrl}
          alt={`${user.firstName || ''} ${user.lastName || ''}`.trim()}
        />
      )}
      <AvatarFallback>
        <span className="font-medium">{defaultFallback}</span>
      </AvatarFallback>
    </Avatar>
  )
})

ProfileAvatar.displayName = 'ProfileAvatar'

export { Avatar, AvatarImage, AvatarFallback, ProfileAvatar } 