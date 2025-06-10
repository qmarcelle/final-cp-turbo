'use client'

import React, { useState, createContext, useContext } from 'react'
import { cn } from '../../../lib/utils'
import { Badge } from '../../foundation/Badge'

interface TabsContextProps {
  activeTab: string
  setActiveTab: (value: string) => void
  variant?: 'default' | 'pills' | 'cards'
  orientation?: 'horizontal' | 'vertical'
}

const TabsContext = createContext<TabsContextProps | null>(null)

const useTabs = () => {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('useTabs must be used within a Tabs component')
  }
  return context
}

export interface TabsProps {
  children: React.ReactNode
  defaultValue: string
  variant?: 'default' | 'pills' | 'cards'
  orientation?: 'horizontal' | 'vertical'
  className?: string
  onChange?: (value: string) => void
}

export const Tabs = ({
  children,
  defaultValue,
  variant = 'default',
  orientation = 'horizontal',
  className,
  onChange,
}: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultValue)

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    onChange?.(value)
  }

  return (
    <TabsContext.Provider
      value={{ activeTab, setActiveTab: handleTabChange, variant, orientation }}
    >
      <div
        className={cn(
          'w-full',
          orientation === 'vertical' ? 'flex gap-6' : 'flex flex-col',
          className
        )}
      >
        {children}
      </div>
    </TabsContext.Provider>
  )
}

export interface TabsListProps {
  children: React.ReactNode
  className?: string
}

export const TabsList = ({ children, className }: TabsListProps) => {
  const { variant, orientation } = useTabs()
  const tabListClasses = cn(
    'flex',
    orientation === 'vertical' ? 'flex-col space-y-1' : 'space-x-1',
    variant === 'default' && 'border-b border-tertiary-gray4',
    variant === 'pills' && 'bg-tertiary-gray5 p-1 rounded-lg',
    variant === 'cards' && 'space-x-2',
    className
  )
  return (
    <div role="tablist" aria-orientation={orientation} className={tabListClasses}>
      {children}
    </div>
  )
}

export interface TabsTriggerProps {
  value: string
  children: React.ReactNode
  disabled?: boolean
  icon?: React.ComponentType<{ className?: string }>
  badge?: number
}

export const TabsTrigger = ({
  value,
  children,
  disabled,
  icon: IconComponent,
  badge,
}: TabsTriggerProps) => {
  const { activeTab, setActiveTab, variant } = useTabs()
  const isActive = activeTab === value

  const getTabClasses = (isActive: boolean) => {
    const baseClasses =
      'relative flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:ring-offset-2'

    if (disabled) {
      return cn(baseClasses, 'cursor-not-allowed opacity-50')
    }

    switch (variant) {
      case 'pills':
        return cn(
          baseClasses,
          'rounded-md',
          isActive
            ? 'bg-white text-primaryBlue shadow-sm'
            : 'text-tertiary-gray3 hover:text-tertiary-gray1 hover:bg-white/50'
        )
      case 'cards':
        return cn(
          baseClasses,
          'rounded-lg border',
          isActive
            ? 'bg-white border-primaryBlue text-primaryBlue shadow-sm'
            : 'border-tertiary-gray4 text-tertiary-gray3 hover:text-tertiary-gray1 hover:border-tertiary-gray3'
        )
      default:
        return cn(
          baseClasses,
          'border-b-2',
          isActive
            ? 'border-primaryBlue text-primaryBlue'
            : 'border-transparent text-tertiary-gray3 hover:text-tertiary-gray1 hover:border-tertiary-gray4'
        )
    }
  }

  return (
    <button
      key={value}
      role="tab"
      aria-selected={isActive}
      aria-controls={`tabpanel-${value}`}
      id={`tab-${value}`}
      disabled={disabled}
      className={getTabClasses(isActive)}
      onClick={() => !disabled && setActiveTab(value)}
    >
      {IconComponent && <IconComponent className="h-4 w-4" />}
      <span>{children}</span>
      {badge && (
        <Badge variant="secondary" size="sm">
          {badge}
        </Badge>
      )}
    </button>
  )
}

export interface TabsContentProps {
  value: string
  children: React.ReactNode
  className?: string
}

export const TabsContent = ({
  value,
  children,
  className,
}: TabsContentProps) => {
  const { activeTab, orientation } = useTabs()
  const isActive = activeTab === value

  if (!isActive) {
    return null
  }

  return (
    <div
      role="tabpanel"
      id={`tabpanel-${value}`}
      aria-labelledby={`tab-${value}`}
      className={cn(
        'flex-1 focus:outline-none',
        orientation === 'horizontal' && 'mt-4',
        className
      )}
    >
      {children}
    </div>
  )
}
