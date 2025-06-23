'use client'

import * as React from 'react'
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import { ChevronRight } from 'lucide-react'
import { cn } from '../../../utils'
import type {
  NavigationSubmenuProps,
  NavigationSubmenuContentProps,
  NavigationColumnProps,
  NavigationQuickTipProps,
  NavigationShortLinksProps,
  NavigationChildPagesProps,
} from '@/types/components.d.ts'
import { navigationSubmenuVariants, navigationLinkVariants } from '@/types/components'
import Link from 'next/link'

export function NavigationSubmenu({ item, className, ...props }: NavigationSubmenuProps) {
  return (
    <NavigationMenuPrimitive.Sub {...props}>
      <NavigationMenuPrimitive.Trigger
        className={cn(
          'group flex select-none items-center justify-between gap-1 rounded-md px-3 py-2 text-sm font-medium',
          'hover:bg-accent hover:text-accent-foreground',
          'focus:bg-accent focus:text-accent-foreground focus:outline-none',
          'data-[state=open]:bg-accent/50',
          className
        )}
      >
        <span>{item.title}</span>
        <ChevronRight
          className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-90"
          aria-hidden="true"
        />
      </NavigationMenuPrimitive.Trigger>
      <NavigationSubmenuContent
        template={item.template!}
        shortLinks={item.shortLinks}
        childPages={item.childPages}
      />
    </NavigationMenuPrimitive.Sub>
  )
}

export function NavigationSubmenuContent({
  template,
  shortLinks,
  quickTip,
  childPages,
  className,
  ...props
}: NavigationSubmenuContentProps) {
  return (
    <NavigationMenuPrimitive.Content
      className={cn(
        'z-50 min-w-[16rem] overflow-hidden rounded-md border bg-popover p-2 text-popover-foreground shadow-lg',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        'data-[side=bottom]:slide-in-from-top-2',
        'data-[side=left]:slide-in-from-right-2',
        'data-[side=right]:slide-in-from-left-2',
        'data-[side=top]:slide-in-from-bottom-2',
        navigationSubmenuVariants.layout.grid,
        className
      )}
      {...props}
    >
      {template.firstCol && (
        <NavigationColumn
          type={template.firstCol}
          quickTip={quickTip}
          shortLinks={shortLinks}
          childPages={childPages}
        />
      )}
      {template.secondCol && (
        <NavigationColumn
          type={template.secondCol}
          childPages={childPages}
        />
      )}
      {template.thirdCol && (
        <NavigationColumn
          type={template.thirdCol}
          childPages={childPages}
        />
      )}
      {template.fourthCol && (
        <NavigationColumn
          type={template.fourthCol}
          childPages={childPages}
        />
      )}
    </NavigationMenuPrimitive.Content>
  )
}

function NavigationColumn({
  type,
  quickTip,
  shortLinks,
  childPages,
  onClose,
  className,
}: NavigationColumnProps) {
  if (type === 'QT' && quickTip) {
    return <NavigationQuickTip quickTip={quickTip} onClose={onClose} />
  }

  if (shortLinks?.length) {
    return <NavigationShortLinks links={shortLinks} onClose={onClose} />
  }

  const filteredPages = childPages?.filter(page => page.category === type) || []
  if (filteredPages.length) {
    return (
      <NavigationChildPages
        pages={filteredPages}
        category={type}
        onClose={onClose}
        className={className}
      />
    )
  }

  return null
}

function NavigationQuickTip({ quickTip, onClose, className }: NavigationQuickTipProps) {
  return (
    <Link
      href={quickTip.link}
      onClick={onClose}
      className={cn(
        'block rounded-lg p-4',
        'bg-accent/50 hover:bg-accent',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        className
      )}
    >
      <h3 className="mb-2 text-sm font-medium">{quickTip.title}</h3>
      <p className="mb-1 text-sm text-muted-foreground">{quickTip.firstParagraph}</p>
      {quickTip.secondParagraph && (
        <p className="text-sm text-muted-foreground">{quickTip.secondParagraph}</p>
      )}
      {quickTip.icon && (
        <div className="mt-2">{quickTip.icon}</div>
      )}
    </Link>
  )
}

function NavigationShortLinks({ links, onClose, className }: NavigationShortLinksProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.link}
          onClick={onClose}
          className={cn(
            'flex items-center justify-between rounded-md p-2',
            'bg-accent/50 hover:bg-accent',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
          )}
        >
          <div className="flex items-center gap-2">
            {link.icon}
            <div>
              <div className="font-medium">{link.title}</div>
              {link.description && (
                <div className="text-sm text-muted-foreground">{link.description}</div>
              )}
            </div>
          </div>
          <ChevronRight className="h-4 w-4" />
        </Link>
      ))}
    </div>
  )
}

function NavigationChildPages({
  pages,
  category,
  onClose,
  className,
}: NavigationChildPagesProps) {
  if (!pages.length) return null

  return (
    <div className={cn('space-y-2', className)}>
      {category !== 'Support' && (
        <h3 className="mb-2 text-sm font-medium text-muted-foreground">{category}</h3>
      )}
      {pages.map((page) =>
        page.text ? (
          <div key={page.id} className="text-sm text-muted-foreground">
            {page.title}
          </div>
        ) : (
          <Link
            key={page.id}
            href={page.url}
            target={page.openInNewWindow ? '_blank' : undefined}
            onClick={onClose}
            className={cn(
              navigationLinkVariants.variant[page.external ? 'external' : 'default'],
              'block rounded-md px-2 py-1.5',
              'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
            )}
          >
            <div className="flex items-center gap-2">
              {page.icon}
              <div>
                <div className="font-medium">{page.title}</div>
                {page.description && (
                  <div className="text-sm text-muted-foreground">{page.description}</div>
                )}
              </div>
              {page.external && (
                <ChevronRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100" />
              )}
            </div>
          </Link>
        )
      )}
    </div>
  )
} 