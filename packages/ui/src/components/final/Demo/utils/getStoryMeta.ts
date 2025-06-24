import type { Meta } from '@storybook/react'
import { designSystemConfig } from '../config/designSystemConfig'
import { StoryMetaOptions } from '../../types'

export type AtomicCategory =
  | 'foundation'
  | 'atoms'
  | 'molecules'
  | 'organisms'
  | 'templates'
  | 'pages'

export interface StoryMetaOptions {
  component: any
  category: AtomicCategory
  name: string
  description?: string
  tags?: string[]
  parameters?: Record<string, any>
}

const categoryTitles: Record<AtomicCategory, string> = {
  foundation: 'Design System',
  atoms: 'Atoms',
  molecules: 'Molecules',
  organisms: 'Organisms',
  templates: 'Templates',
  pages: 'Pages',
}

const componentEmojis: Record<string, string> = {
  // Atoms
  Button: '🔘',
  Badge: '🏷️',
  Input: '⌨️',
  Select: '📝',
  // Foundation
  Colors: '🎨',
  Typography: '📜',
  Spacing: '📏',
  Shadows: '🌗',
  // Molecules
  Alert: '⚠️',
  Card: '🃏',
  StatBlock: '📊',
  // Organisms
  Footer: '👣',
  SiteHeader: '🎯',
  // Pages
  BookOfBusinessPage: '📚',
  BrokerDashboardPage: '📊',
  ReportingOverviewPage: '📈',
  // Templates
  DashboardLayout: '📋',
}

function getComponentEmoji(name: string): string {
  return componentEmojis[name] || ''
}

export function getStoryMeta(options: StoryMetaOptions): Meta {
  const {
    component,
    category,
    name,
    description,
    tags = ['autodocs'],
    parameters = {},
  } = options

  const categoryTitle = categoryTitles[category] || category
  const componentEmoji = getComponentEmoji(name)

  return {
    title: `${categoryTitle}/${name} ${componentEmoji}`,
    component,
    tags,
    parameters: {
      docs: {
        description: {
          component: description || `${name} component documentation`,
        },
      },
      ...parameters,
    },
    argTypes: {
      className: {
        control: 'text',
        description: 'Additional CSS classes to apply',
      },
    },
  } satisfies Meta
}

export function getFoundationMeta(name: string, description?: string): Meta {
  return {
    title: `🎨 Design System/${name}`,
    tags: ['autodocs'],
    parameters: {
      docs: {
        description: {
          component: description || `${name} design tokens and guidelines`,
        },
      },
      layout: 'padded',
    },
  } satisfies Meta
}

export function getPageMeta(name: string, description?: string): Meta {
  return {
    title: `Pages/${name} 📄`,
    tags: ['autodocs'],
    parameters: {
      layout: 'fullscreen',
      docs: {
        description: {
          component: description || `${name} page composition`,
        },
      },
    },
  } satisfies Meta
}

// Helper to find component config in design system
export function findComponentConfig(componentName: string) {
  function searchCategories(categories: any[]): any {
    for (const category of categories) {
      if (category.name.toLowerCase() === componentName.toLowerCase()) {
        return category
      }
      if (category.children) {
        const found = searchCategories(category.children)
        if (found) return found
      }
    }
    return null
  }

  return searchCategories(designSystemConfig)
}
