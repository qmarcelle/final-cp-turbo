'use client'

import React, { useState } from 'react'
import { cn } from '../../../lib/utils'
import { Badge } from '../../foundation/Badge'

export interface Tab {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
  badge?: number
  disabled?: boolean
}

export interface TabsProps {
  tabs: Tab[]
  children: (activeTab: string) => React.ReactNode
  defaultValue?: string
  variant?: 'default' | 'pills' | 'cards'
  orientation?: 'horizontal' | 'vertical'
  className?: string
  onChange?: (value: string) => void
}

export const Tabs = ({
  tabs,
  children,
  defaultValue,
  variant = 'default',
  orientation = 'horizontal',
  className,
  onChange,
}: TabsProps) => {
  const [activeTab, setActiveTab] = useState(
    defaultValue || tabs[0]?.value || ''
  )

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    onChange?.(value)
  }

  const tabListClasses = cn(
    'flex',
    orientation === 'vertical' ? 'flex-col space-y-1' : 'space-x-1',
    variant === 'default' && 'border-b border-tertiary-gray4',
    variant === 'pills' && 'bg-tertiary-gray5 p-1 rounded-lg',
    variant === 'cards' && 'space-x-2'
  )

  const getTabClasses = (tab: Tab, isActive: boolean) => {
    const baseClasses =
      'relative flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:ring-offset-2'

    if (tab.disabled) {
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
    <div className={cn('w-full', className)}>
      <div
        className={cn(
          'flex',
          orientation === 'vertical' ? 'gap-6' : 'flex-col'
        )}
      >
        {/* Tab List */}
        <div
          role="tablist"
          aria-orientation={orientation}
          className={tabListClasses}
        >
          {tabs.map(tab => {
            const isActive = activeTab === tab.value
            const IconComponent = tab.icon

            return (
              <button
                key={tab.value}
                role="tab"
                aria-selected={isActive}
                aria-controls={`tabpanel-${tab.value}`}
                id={`tab-${tab.value}`}
                disabled={tab.disabled}
                className={getTabClasses(tab, isActive)}
                onClick={() => !tab.disabled && handleTabChange(tab.value)}
              >
                {IconComponent && <IconComponent className="h-4 w-4" />}
                <span>{tab.label}</span>
                {tab.badge && (
                  <Badge variant="secondary" size="sm">
                    {tab.badge}
                  </Badge>
                )}
              </button>
            )
          })}
        </div>

        {/* Tab Panels */}
        <div className={cn('flex-1', orientation === 'vertical' ? '' : 'mt-4')}>
          <div
            role="tabpanel"
            id={`tabpanel-${activeTab}`}
            aria-labelledby={`tab-${activeTab}`}
            className="focus:outline-none"
          >
            {children(activeTab)}
          </div>
        </div>
      </div>
    </div>
  )
}
