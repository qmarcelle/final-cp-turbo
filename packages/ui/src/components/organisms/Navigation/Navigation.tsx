'use client'

import * as React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { ChevronRight, LogOut, Settings, User } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useMediaQuery } from 'react-responsive'
import { cn } from '../../../utils'
import { ProfileAvatar } from '../../atoms/Avatar/Avatar'

export interface NavigationConfig {
  basePath: string
  logo: {
    full: string
    stacked: string
    alt: string
  }
  navigation: NavigationLink[]
}

export interface NavigationLink {
  id: number
  title: string
  url: string
  icon?: React.ReactNode
  children?: NavigationLink[]
}

export interface UserProfile {
  id: string
  firstName?: string
  lastName?: string
  email?: string
  avatarUrl?: string
}

export interface NavigationProps {
  config: NavigationConfig
  user: UserProfile
  onLogout?: () => void
  className?: string
}

export function Navigation({ config, user, onLogout, className }: NavigationProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [activeSubNavId, setActiveSubNavId] = React.useState<number | null>(null)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    if (isOpen) {
      setActiveSubNavId(null)
    }
  }

  const openSubMenu = (itemId: number) => {
    setIsOpen(true)
    setActiveSubNavId((prevId) => (prevId === itemId ? null : itemId))
  }

  const closeSubMenu = () => {
    setIsOpen(false)
    setActiveSubNavId(null)
  }

  const defaultProfileItems = [
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
      onClick: onLogout,
    },
  ]

  return (
    <nav className={cn('w-full', className)}>
      {/* Header Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex h-18 w-full justify-between border-b bg-white">
        <div className="flex items-center">
          <div className="flex h-18 w-18 items-center justify-center border-r lg:hidden">
            <button
              type="button"
              className="p-0 justify-center"
              aria-controls="menu-bar"
              aria-expanded={isOpen}
              onClick={toggleMenu}
            >
              <span className="sr-only">
                {isOpen ? 'Close main menu' : 'Open main menu'}
              </span>
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
          <Link className="ml-5 lg:px-0" href={`${config.basePath}/home`}>
            {useMediaQuery({ query: '(max-width: 1023px)' }) ? (
              <Image
                width={64}
                height={36}
                src={config.logo.stacked}
                alt={config.logo.alt}
              />
            ) : (
              <Image
                width={174}
                height={35}
                src={config.logo.full}
                alt={config.logo.alt}
              />
            )}
          </Link>
        </div>

        {/* Profile Menu */}
        <div className="flex items-center pr-4">
          <DropdownMenuPrimitive.Root>
            <DropdownMenuPrimitive.Trigger asChild>
              <button
                className={cn(
                  'flex items-center gap-2 rounded-full outline-none',
                  'focus:ring-2 focus:ring-ring focus:ring-offset-2',
                  'disabled:cursor-not-allowed disabled:opacity-50'
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
                  'data-[side=top]:slide-in-from-bottom-2'
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
                  {defaultProfileItems.map((item) => (
                    <ProfileMenuItem key={item.id} item={item} />
                  ))}
                </div>
              </DropdownMenuPrimitive.Content>
            </DropdownMenuPrimitive.Portal>
          </DropdownMenuPrimitive.Root>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 top-[72px] z-20 bg-black bg-opacity-40"
          onClick={closeSubMenu}
        />
      )}

      {/* Navigation Menu */}
      <div
        id="menu-bar"
        className={cn(
          'fixed top-[72px] z-20 h-full w-full bg-white shadow-lg transition-transform duration-300 ease-in-out md:h-fit md:w-1/2 lg:block lg:w-full',
          {
            'translate-x-0': isOpen,
            '-translate-x-full lg:translate-x-0': !isOpen,
          }
        )}
      >
        <div className="flex flex-col lg:flex-row">
          {config.navigation.map((item) => (
            <NavigationItem
              key={item.id}
              item={item}
              isActive={activeSubNavId === item.id}
              onSelect={() => openSubMenu(item.id)}
            />
          ))}
        </div>
      </div>
    </nav>
  )
}

interface NavigationItemProps {
  item: NavigationLink
  isActive: boolean
  onSelect: () => void
}

function NavigationItem({ item, isActive, onSelect }: NavigationItemProps) {
  return (
    <div className="relative">
      <button
        onClick={onSelect}
        className={cn(
          'flex w-full items-center gap-2 px-4 py-3 text-sm font-medium transition-colors',
          'hover:bg-accent hover:text-accent-foreground',
          'focus:bg-accent focus:text-accent-foreground focus:outline-none',
          isActive && 'bg-accent text-accent-foreground'
        )}
      >
        {item.icon}
        {item.title}
        {item.children && (
          <ChevronRight
            className={cn('ml-auto h-4 w-4 transition-transform', {
              'rotate-90': isActive,
            })}
          />
        )}
      </button>

      {isActive && item.children && (
        <div className="absolute left-full top-0 min-w-[200px] bg-white shadow-lg">
          {item.children.map((child) => (
            <Link
              key={child.id}
              href={child.url}
              className={cn(
                'block px-4 py-2 text-sm transition-colors',
                'hover:bg-accent hover:text-accent-foreground',
                'focus:bg-accent focus:text-accent-foreground focus:outline-none'
              )}
            >
              {child.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

interface ProfileMenuItemProps {
  item: {
    id: string
    label: string
    description?: string
    icon?: React.ReactNode
    href?: string
    onClick?: () => void
  }
}

function ProfileMenuItem({ item }: ProfileMenuItemProps) {
  const content = (
    <DropdownMenuPrimitive.Item
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
        'focus:bg-accent focus:text-accent-foreground',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
      )}
      onClick={item.onClick}
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