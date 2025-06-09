import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';
import { useArgs } from 'storybook/internal/preview-api';

const meta: Meta<typeof Pagination> = {
  title: '🧪 Experimental/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# 🧪 Experimental - Pagination

⚠️ **This component is experimental and pending approval. It should not be used in production.**

A pagination component for navigating through large sets of data.

## Features
- **Page navigation**: Navigate to specific pages
- **Previous/Next**: Step through pages sequentially  
- **Page info**: Display current page and total pages
- **Responsive**: Works on different screen sizes
- **Customizable**: Control appearance and behavior

## Usage
\`\`\`tsx
<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={handlePageChange}
/>
\`\`\`

---
`,
      },
    },
  },
  argTypes: {
    currentPage: {
      control: 'number',
      description: 'The currently active page number'
    },
    totalPages: {
      control: 'number', 
      description: 'Total number of pages available'
    },
    onPageChange: {
      action: 'page-changed',
      description: 'Function called when page changes'
    }
  }
};

export default meta;

export const Default: StoryObj<typeof Pagination> = {
    render: function Render(args) {
        const [{ currentPage }, updateArgs] = useArgs();
    
        const handlePageChange = (page: number) => {
          updateArgs({ currentPage: page });
        };
    
        return <Pagination {...args} currentPage={currentPage} onPageChange={handlePageChange} />;
    },
  args: {
    currentPage: 5,
    totalPages: 20,
  },
};

export const WithPageInfo: StoryObj<typeof Pagination> = {
    render: function Render(args) {
        const [{ currentPage }, updateArgs] = useArgs();
    
        const handlePageChange = (page: number) => {
          updateArgs({ currentPage: page });
        };
    
        return <Pagination {...args} currentPage={currentPage} onPageChange={handlePageChange} />;
    },
  args: {
    currentPage: 1,
    totalPages: 50,
  },
};

export const Minimal: StoryObj<typeof Pagination> = {
    render: function Render(args) {
        const [{ currentPage }, updateArgs] = useArgs();
    
        const handlePageChange = (page: number) => {
          updateArgs({ currentPage: page });
        };
    
        return <Pagination {...args} currentPage={currentPage} onPageChange={handlePageChange} />;
    },
    args: {
        currentPage: 8,
        totalPages: 15,
      },
};