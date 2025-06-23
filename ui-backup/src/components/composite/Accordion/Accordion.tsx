'use client'

import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDownIcon } from '../../../lib/icons'
import { cn } from '../../../lib/utils'
import type { AccordionProps } from '../../../types'

const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  AccordionProps
>(({ title, children, isOpen, onToggle, className }, ref) => {
  const value = isOpen ? ['item-1'] : [];
  const onValueChange = (value: string[]) => {
    onToggle();
  };

  return (
    <AccordionPrimitive.Root
      ref={ref}
      type="multiple"
      className={cn('w-full', className)}
      value={value}
      onValueChange={onValueChange}
    >
      <AccordionPrimitive.Item value="item-1" className="border-b border-tertiaryGray4">
        <AccordionPrimitive.Header className="flex">
          <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between py-4 font-bold text-primaryBlue cursor-pointer hover:text-secondaryBlue2 focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:ring-offset-2 transition-colors duration-200">
            {title}
            <ChevronDownIcon className="h-4 w-4 shrink-0 transition-transform duration-200 data-[state=open]:rotate-180" />
          </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
        <AccordionPrimitive.Content className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          <div className="pb-4 pt-0 text-tertiaryGray1">{children}</div>
        </AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
    </AccordionPrimitive.Root>
  );
});

Accordion.displayName = 'Accordion';

export { Accordion };