import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cn } from '../../../lib/utils'
import type {
  AvatarProps,
  AvatarImageProps,
  AvatarFallbackProps,
  AvatarWithSizeProps,
} from '../../../types'

const avatarSizes = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16',
} as const

const getInitials = (name: string) => {
  const [firstName, lastName] = name.split(' ')
  if (firstName && lastName) {
    return `${firstName[0]}${lastName[0]}`
  }
  return firstName ? firstName.substring(0, 2) : ''
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'transition-all duration-200 ease-in-out',
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
      'bg-neutral-100 text-neutral-600 font-medium text-sm',
      'dark:bg-neutral-800 dark:text-neutral-300',
      'transition-colors duration-200',
      className
    )}
    {...props}
  >
    {children || (name ? getInitials(name) : null)}
  </AvatarPrimitive.Fallback>
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

const AvatarWithSize = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarWithSizeProps
>(({ className, size = 'md', ...props }, ref) => (
  <Avatar
    ref={ref}
    className={cn(avatarSizes[size as keyof typeof avatarSizes], className)}
    {...props}
  />
))
AvatarWithSize.displayName = 'AvatarWithSize'

export { Avatar, AvatarImage, AvatarFallback, AvatarWithSize } 