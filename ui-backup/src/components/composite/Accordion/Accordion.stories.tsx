import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion } from './Accordion';
import { useState } from 'react';

const meta: Meta<typeof Accordion> = {
  title: '🦠 Organisms/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Expandable/collapsible content sections.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
    },
    isOpen: {
      control: 'boolean',
    },
    onToggle: {
      action: 'toggled',
    },
  },
  args: {
    title: 'Accordion Title',
    isOpen: false,
    children: 'This is the content of the accordion.'
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(args.isOpen);

    const handleToggle = () => {
      setIsOpen(!isOpen);
      args.onToggle();
    }

    return (
      <Accordion {...args} isOpen={isOpen} onToggle={handleToggle}>
        {args.children}
      </Accordion>
    )
  }
};

export const Open: Story = {
    args: {
        isOpen: true,
        title: 'Initially Open Accordion',
        children: 'This accordion starts in the open state.'
    },
    render: (args) => {
        const [isOpen, setIsOpen] = useState(args.isOpen);
    
        const handleToggle = () => {
          setIsOpen(!isOpen);
          args.onToggle();
        }
    
        return (
          <Accordion {...args} isOpen={isOpen} onToggle={handleToggle}>
            {args.children}
          </Accordion>
        )
      }
};
