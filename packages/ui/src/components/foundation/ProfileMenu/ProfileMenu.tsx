'use client'

import * as React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { ChevronRight, LogOut, Settings, User } from 'lucide-react'
import Link from 'next/link'
import { cn } from '../../../utils'
import { ProfileAvatar } from '../ProfileAvatar/ProfileAvatar'
import type {
  ProfileMenuProps,
  ProfileMenuItemProps,
  ProfileMenuItem as ProfileMenuItemType,
} from '@/types/components'

const defaultItems: ProfileMenuItemType[] = [
  {
    id: 'profile',
    label: 'My Profile',
    description: 'Manage your account settings',
    icon: <User className="h-4 w-4" />,
    href: '/profile',
  },
  {
    id: 'settings',
    label: 'Settings',
    description: 'Customize your preferences',
    icon: <Settings className="h-4 w-4" />,
    href: '/settings',
  },
  {
    id: 'logout',
    label: 'Log Out',
    icon: <LogOut className="h-4 w-4" />,
    onClick: () => {
      // Handle logout
      console.log('Logout clicked')
    },
  },
]

export function ProfileMenu({ user, items = defaultItems, className }: ProfileMenuProps) {
  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild>
        <button
          className={cn(
            'flex items-center gap-2 rounded-full outline-none',
            'focus:ring-2 focus:ring-ring focus:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
        >
          <ProfileAvatar user={user} size="sm" />
          <span className="hidden text-sm font-medium md:inline-block">
            {user.firstName} {user.lastName}
          </span>
        </button>
      </DropdownMenuPrimitive.Trigger>

      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          className={cn(
            'z-50 min-w-[240px] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
            'data-[side=bottom]:slide-in-from-top-2',
            'data-[side=left]:slide-in-from-right-2',
            'data-[side=right]:slide-in-from-left-2',
            'data-[side=top]:slide-in-from-bottom-2',
          )}
        >
          <div className="flex items-center gap-2 border-b p-2">
            <ProfileAvatar user={user} size="sm" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">
                {user.firstName} {user.lastName}
              </span>
              <span className="text-xs text-muted-foreground">
                {user.email}
              </span>
            </div>
          </div>

          <div className="p-1">
            {items.map((item) =>
              item.children ? (
                <ProfileMenuSubItem key={item.id} item={item} />
              ) : (
                <ProfileMenuListItem key={item.id} item={item} />
              )
            )}
          </div>
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  )
}

function ProfileMenuListItem({ item, inset, className, ...props }: ProfileMenuItemProps) {
  const content = (
    <DropdownMenuPrimitive.Item
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
        'focus:bg-accent focus:text-accent-foreground',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        inset && 'pl-8',
        className
      )}
      {...props}
    >
      {item.icon && (
        <span className="mr-2 h-4 w-4">
          {item.icon}
        </span>
      )}
      <span className="flex-1">
        <span>{item.label}</span>
        {item.description && (
          <span className="block text-xs text-muted-foreground">
            {item.description}
          </span>
        )}
      </span>
      {item.shortcut && (
        <span className="ml-auto text-xs tracking-widest text-muted-foreground">
          {item.shortcut}
        </span>
      )}
    </DropdownMenuPrimitive.Item>
  )

  if (item.href) {
    return (
      <Link href={item.href} className="block outline-none">
        {content}
      </Link>
    )
  }

  return content
}

function ProfileMenuSubItem({ item }: { item: ProfileMenuItemType }) {
  return (
    <DropdownMenuPrimitive.Sub>
      <DropdownMenuPrimitive.SubTrigger
        className={cn(
          'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
          'focus:bg-accent focus:text-accent-foreground',
          'data-[state=open]:bg-accent data-[state=open]:text-accent-foreground'
        )}
      >
        {item.icon && (
          <span className="mr-2 h-4 w-4">
            {item.icon}
          </span>
        )}
        <span className="flex-1">
          <span>{item.label}</span>
          {item.description && (
            <span className="block text-xs text-muted-foreground">
              {item.description}
            </span>
          )}
        </span>
        <ChevronRight className="ml-2 h-4 w-4" />
      </DropdownMenuPrimitive.SubTrigger>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.SubContent
          className={cn(
            'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
            'data-[side=bottom]:slide-in-from-top-2',
            'data-[side=left]:slide-in-from-right-2',
            'data-[side=right]:slide-in-from-left-2',
            'data-[side=top]:slide-in-from-bottom-2'
          )}
        >
          {item.children?.map((child) => (
            <ProfileMenuListItem key={child.id} item={child} />
          ))}
        </DropdownMenuPrimitive.SubContent>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Sub>
  )
} 