'use client'

import * as React from 'react'
import { DayPicker } from 'react-day-picker'
import { ChevronLeftIcon, ChevronRightIcon } from '../../../lib/icons'
import { cn } from '../../../lib/utils'
import { buttonVariants, ScrollArea } from '..'
import * as SelectPrimitive from '../select'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('rdp p-3', className)}
      classNames={{
        months:
          'rdp-months flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'rdp-month space-y-4',
        caption: 'rdp-caption flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        caption_dropdowns: 'rdp-dropdown flex justify-center gap-1',
        nav: 'rdp-nav space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline', size: 'sm' }),
          'rdp-nav_button h-7 w-7 bg-transparent p-0 opacity-70 hover:opacity-100'
        ),
        nav_button_previous: 'rdp-nav_button_previous absolute left-1',
        nav_button_next: 'rdp-nav_button_next absolute right-1',
        table: 'rdp-table w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell:
          'rdp-head_cell text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        cell: 'rdp-cell h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
        day: cn('rdp-button h-9 w-9 p-0 font-normal aria-selected:opacity-100'),
        day_selected:
          'rdp-day_selected bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today: 'rdp-day_today bg-accent text-accent-foreground',
        day_outside:
          'rdp-day_outside text-gray-400 rounded-md w-9 font-normal text-xs opacity-50 aria-selected:bg-gray-100/50 aria-selected:text-gray-400 aria-selected:opacity-30',
        day_disabled: 'rdp-day_disabled text-muted-foreground opacity-50',
        day_range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      captionLayout="dropdown"
      fromYear={new Date().getFullYear() - 80}
      toYear={new Date().getFullYear()}
      components={{
        Dropdown: ({ value, onChange, options }) => {
          const handleChange = (newValue: string) => {
            const changeEvent = {
              target: { value: newValue },
            } as React.ChangeEvent<HTMLSelectElement>
            onChange?.(changeEvent)
          }

          const selectedOption = options?.find(option => option.value === value)

          return (
            <SelectPrimitive.Root
              value={value?.toString()}
              onValueChange={(value: string) => {
                handleChange(value)
              }}
            >
              <SelectPrimitive.Trigger className="pr-1.5 focus:ring-0">
                <SelectPrimitive.Value>
                  {selectedOption?.label}
                </SelectPrimitive.Value>
              </SelectPrimitive.Trigger>
              <SelectPrimitive.Content position="popper">
                <ScrollArea className="h-80">
                  {options?.map((option, id: number) => (
                    <SelectPrimitive.Item
                      key={`${option.value}-${id}`}
                      value={option.value?.toString() ?? ''}
                    >
                      {option.label}
                    </SelectPrimitive.Item>
                  ))}
                </ScrollArea>
              </SelectPrimitive.Content>
            </SelectPrimitive.Root>
          )
        },
        NextMonthButton: props => (
          <button {...props} className="rdp-nav_button">
            <span className="sr-only">Next month</span>
            <ChevronRightIcon size="default" responsive />
          </button>
        ),
        PreviousMonthButton: props => (
          <button {...props} className="rdp-nav_button">
            <span className="sr-only">Previous month</span>
            <ChevronLeftIcon size="default" responsive />
          </button>
        ),
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }
