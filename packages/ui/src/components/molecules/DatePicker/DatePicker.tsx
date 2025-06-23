'use client'

import 'react-datepicker/dist/react-datepicker.css'

// react-datepicker CSS is now imported in the Storybook CSS file

import * as React from 'react'
import { useController, Control, FieldValues, Path, RegisterOptions } from 'react-hook-form'
import ReactDatePicker, { ReactDatePickerCustomHeaderProps } from 'react-datepicker'
import type { DatePickerProps as ReactDatePickerProps } from 'react-datepicker'
import { cn } from '../../../utils/cn'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { DayPicker } from 'react-day-picker'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { Button } from '../../atoms/Button/Button'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'

// Type declarations
export type DateFormat = 
  | 'MM/dd/yyyy'
  | 'MM/dd/yyyy h:mm aa'
  | 'MM/dd/yyyy HH:mm'
  | 'yyyy-MM-dd'
  | 'yyyy-MM-dd HH:mm'
  | string

export interface DateRange {
  startDate: Date | null
  endDate: Date | null
}

type DatePickerCustomProps = {
  customInput?: React.ReactElement
  popperPlacement?: ReactDatePickerProps['popperPlacement']
}

export interface DatePickerProps<TFieldValues extends FieldValues = FieldValues> {
  // Form integration props
  name?: Path<TFieldValues>
  control?: Control<TFieldValues>
  validation?: RegisterOptions<TFieldValues>
  
  // Base props
  value?: Date | DateRange | null
  onChange?: (date: Date | DateRange | null) => void
  label?: string
  required?: boolean
  disabled?: boolean
  placeholder?: string
  className?: string
  error?: string
  hint?: string

  // Date constraints
  minDate?: Date
  maxDate?: Date
  excludeDates?: Date[]
  includeDates?: Date[]
  disabledDaysOfWeek?: number[]
  filterDate?: (date: Date) => boolean

  // Display options
  mode?: 'single' | 'range'
  showTime?: boolean
  timeFormat?: '12h' | '24h'
  timeIntervals?: number
  dateFormat?: DateFormat
  showOutsideDays?: boolean
  fixedWeeks?: boolean
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  locale?: string

  // Custom styling
  popoverClassName?: string
  calendarClassName?: string
  
  // Testing
  'data-cy'?: string
}

export const DatePicker = React.forwardRef<
  HTMLDivElement,
  DatePickerProps<any>
>(({
    // Form props
    name,
    control,
    validation,
    
    // Base props
    value: propValue,
    onChange: propOnChange,
    label,
    required,
    disabled,
    placeholder = 'Pick a date',
    className,
    error,
    hint,

    // Date constraints
    minDate,
    maxDate,
    excludeDates,
    includeDates,
    disabledDaysOfWeek,
    filterDate,

    // Display options
    mode = 'single',
    showTime = false,
    timeFormat = '12h',
    timeIntervals = 30,
    dateFormat,
    showOutsideDays = true,
    fixedWeeks = false,
    weekStartsOn = 0,
    locale,

    // Custom styling
    popoverClassName,
    calendarClassName,
    
    // Testing
    'data-cy': dataCy,
  }, ref) => {
  const [isOpen, setIsOpen] = React.useState(false)

  // Form integration
  const formContext = name && control ? useController({
    name,
    control,
    rules: {
      ...validation,
      required: required ? 'This field is required' : false,
    },
  }) : null

  // Handle controlled vs uncontrolled state
  const value = formContext ? formContext.field.value : propValue
  const onChange = formContext ? formContext.field.onChange : propOnChange

  // Format date for display
  const formatString = React.useMemo(() => {
    if (dateFormat) return dateFormat
    if (showTime) {
      return timeFormat === '24h' ? 'yyyy-MM-dd HH:mm' : 'MM/dd/yyyy h:mm aa'
    }
    return 'MM/dd/yyyy'
  }, [dateFormat, showTime, timeFormat])

  const displayValue = React.useMemo(() => {
    if (!value) return ''
    if (mode === 'range' && typeof value === 'object') {
      const { startDate, endDate } = value as DateRange
      if (!startDate && !endDate) return ''
      if (!endDate) return format(startDate!, formatString)
      return `${format(startDate!, formatString)} - ${format(endDate, formatString)}`
    }
    return format(value as Date, formatString)
  }, [value, mode, formatString])

  const handleDateChange = (date: Date | DateRange | null) => {
    onChange?.(date)
    if (!showTime) {
      setIsOpen(false)
    }
  }

  const isDateDisabled = (date: Date): boolean => {
    const isDisabledDate = excludeDates?.some(
      (disabledDate) => format(date, 'yyyy-MM-dd') === format(disabledDate, 'yyyy-MM-dd')
    )
    const isDisabledDayOfWeek = disabledDaysOfWeek?.includes(date.getDay())
    const isBeforeMinDate = minDate && date < new Date(minDate.setHours(0, 0, 0, 0))
    const isAfterMaxDate = maxDate && date > new Date(maxDate.setHours(23, 59, 59, 999))
    const isFilteredOut = filterDate && !filterDate(date)
    const isNotIncluded = includeDates && !includeDates.some(
      (includeDate) => format(date, 'yyyy-MM-dd') === format(includeDate, 'yyyy-MM-dd')
    )

    return (
      disabled ||
      !!isDisabledDate ||
      !!isDisabledDayOfWeek ||
      !!isBeforeMinDate ||
      !!isAfterMaxDate ||
      !!isFilteredOut ||
      (!!includeDates && !!isNotIncluded)
    )
  }

  return (
    <div 
      ref={ref}
      className={cn('form-control', className)}
      data-cy={dataCy}
    >
      {label && (
        <label
          htmlFor={name}
          className={cn(
            'form-label mb-2 block text-sm font-medium',
            required && 'required',
            disabled && 'opacity-50'
          )}
        >
          {label}
        </label>
      )}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className={cn(
              'w-full justify-start text-left font-normal',
              !value && 'text-muted-foreground',
              error && 'border-destructive',
              disabled && 'cursor-not-allowed opacity-50'
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {displayValue || placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={cn('w-auto p-0', popoverClassName)}
          align="start"
        >
          <DayPicker
            mode={mode === 'range' ? 'range' : 'single'}
            selected={value as any}
            onSelect={handleDateChange as any}
            disabled={isDateDisabled}
            showOutsideDays={showOutsideDays}
            fixedWeeks={fixedWeeks}
            weekStartsOn={weekStartsOn}
            className={calendarClassName}
            locale={locale as any}
          />
          {showTime && (
            <div className="border-t p-3">
              {/* Time picker implementation */}
            </div>
          )}
        </PopoverContent>
      </Popover>
      {error && (
        <p 
          className="form-error mt-1 text-sm text-destructive" 
          role="alert"
          id={name ? `${name}-error` : undefined}
        >
          {error}
        </p>
      )}
      {hint && !error && (
        <p
          className="form-hint mt-1 text-sm text-muted-foreground"
          id={name ? `${name}-hint` : undefined}
        >
          {hint}
        </p>
      )}
    </div>
  )
})

DatePicker.displayName = 'DatePicker'

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
          'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors',
          'hover:bg-accent hover:text-accent-foreground',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50'
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell: 'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        cell: cn(
          'h-9 w-9 text-center text-sm p-0 relative',
          '[&:has([aria-selected])]:bg-accent',
          'first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md',
          'focus-within:relative focus-within:z-20'
        ),
        day: cn(
          'h-9 w-9 p-0 font-normal',
          'inline-flex items-center justify-center rounded-md',
          'hover:bg-accent hover:text-accent-foreground',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          'aria-selected:opacity-100'
        ),
        day_selected: cn(
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground',
          'focus:bg-primary focus:text-primary-foreground'
        ),
        day_today: 'bg-accent text-accent-foreground',
        day_outside: 'text-muted-foreground opacity-50',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeftIcon className="h-4 w-4" />,
        IconRight: () => <ChevronRightIcon className="h-4 w-4" />,
      }}
      {...props}
    />
  )
}

Calendar.displayName = 'Calendar'

export { DatePicker, Calendar } 