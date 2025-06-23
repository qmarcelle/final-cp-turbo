import type { Meta } from '@storybook/react';
import { designSystemConfig } from '../config/designSystemConfig';

export type AtomicCategory = 'foundation' | 'atoms' | 'molecules' | 'organisms' | 'templates' | 'pages';

export interface StoryMetaOptions {
  component: any;
  category: AtomicCategory;
  name: string;
  description?: string;
  tags?: string[];
  parameters?: Record<string, any>;
}

const categoryIcons = {
  foundation: '🎨',
  atoms: '⚛️',
  molecules: '🧬',
  organisms: '🦠',
  templates: '📐',
  pages: '📄',
};

const categoryTitles = {
  foundation: 'Design System',
  atoms: 'Atoms',
  molecules: 'Molecules', 
  organisms: 'Organisms',
  templates: 'Templates',
  pages: 'Pages',
};

export function getStoryMeta(options: StoryMetaOptions): Meta {
  const { component, category, name, description, tags = ['autodocs'], parameters = {} } = options;
  
  const categoryIcon = categoryIcons[category] || '';
  const categoryTitle = categoryTitles[category] || category;
  
  return {
    title: `${categoryIcon} ${categoryTitle}/${name}`,
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
  } satisfies Meta;
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
  } satisfies Meta;
}

export function getPageMeta(name: string, description?: string): Meta {
  return {
    title: `📄 Pages/${name}`,
    tags: ['autodocs'],
    parameters: {
      layout: 'fullscreen',
      docs: {
        description: {
          component: description || `${name} page composition`,
        },
      },
    },
  } satisfies Meta;
}

// Helper to find component config in design system
export function findComponentConfig(componentName: string) {
  function searchCategories(categories: any[]): any {
    for (const category of categories) {
      if (category.name.toLowerCase() === componentName.toLowerCase()) {
        return category;
      }
      if (category.children) {
        const found = searchCategories(category.children);
        if (found) return found;
      }
    }
    return null;
  }
  
  return searchCategories(designSystemConfig);
}