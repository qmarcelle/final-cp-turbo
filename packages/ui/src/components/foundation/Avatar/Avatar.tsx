import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../../lib/utils'

const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden rounded-full',
  {
    variants: {
      size: {
        sm: 'h-6 w-6',
        md: 'h-8 w-8',
        lg: 'h-10 w-10',
        xl: 'h-12 w-12',
        '2xl': 'h-16 w-16',
        '3xl': 'h-20 w-20',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

const avatarImageVariants = cva('aspect-square h-full w-full object-cover')

const avatarFallbackVariants = cva(
  'flex h-full w-full items-center justify-center bg-muted text-muted-foreground font-medium',
  {
    variants: {
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
        xl: 'text-lg',
        '2xl': 'text-xl',
        '3xl': 'text-2xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  /**
   * The image source URL
   */
  src?: string
  /**
   * Alternative text for the image
   */
  alt?: string
  /**
   * Fallback content when image fails to load
   */
  fallback?: React.ReactNode
  /**
   * Name to generate initials from
   */
  name?: string
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, src, alt, fallback, name, ...props }, ref) => {
  // Generate fallback content
  const fallbackContent = fallback || (name ? getInitials(name) : '?')

  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(avatarVariants({ size }), className)}
      {...props}
    >
      {src && (
        <AvatarPrimitive.Image
          src={src}
          alt={alt || name || 'Avatar'}
          className={cn(avatarImageVariants())}
        />
      )}
      <AvatarPrimitive.Fallback
        className={cn(avatarFallbackVariants({ size }))}
        delayMs={600}
      >
        {fallbackContent}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  )
})
Avatar.displayName = AvatarPrimitive.Root.displayName

// Avatar Group for showing multiple avatars
export interface AvatarGroupProps {
  /**
   * Array of avatar data
   */
  avatars: Array<{
    src?: string
    alt?: string
    name?: string
    fallback?: React.ReactNode
  }>
  /**
   * Maximum number of avatars to show
   */
  max?: number
  /**
   * Size of avatars
   */
  size?: VariantProps<typeof avatarVariants>['size']
  /**
   * Additional className
   */
  className?: string
  /**
   * Show count of remaining avatars
   */
  showCount?: boolean
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ avatars, max = 3, size = 'md', className, showCount = true }, ref) => {
    const visibleAvatars = avatars.slice(0, max)
    const remainingCount = Math.max(0, avatars.length - max)

    return (
      <div ref={ref} className={cn('flex -space-x-2', className)}>
        {visibleAvatars.map((avatar, index) => (
          <Avatar
            key={index}
            size={size}
            src={avatar.src}
            alt={avatar.alt}
            name={avatar.name}
            fallback={avatar.fallback}
            className="border-2 border-background"
          />
        ))}

        {remainingCount > 0 && showCount && (
          <Avatar
            size={size}
            fallback={`+${remainingCount}`}
            className="border-2 border-background bg-muted"
          />
        )}
      </div>
    )
  }
)
AvatarGroup.displayName = 'AvatarGroup'

export { Avatar, AvatarGroup, avatarVariants }
