'use client'

import 'react-datepicker/dist/react-datepicker.css'

// react-datepicker CSS is now imported in the Storybook CSS file

import * as React from 'react'
import {
  useController,
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form'
import ReactDatePicker from 'react-datepicker'
import type { DatePickerProps as ReactDatePickerProps } from 'react-datepicker'
import { cn } from '../../../utils/cn'

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

export interface DatePickerProps<
  TFieldValues extends FieldValues = FieldValues,
> {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  label?: string
  required?: boolean
  disabled?: boolean
  placeholder?: string
  className?: string
  minDate?: Date
  maxDate?: Date
  excludeDates?: Date[]
  includeDates?: Date[]
  filterDate?: (date: Date) => boolean
  showTime?: boolean
  timeIntervals?: number
  timeFormat?: '12h' | '24h'
  mode?: 'single' | 'range'
  dateFormat?: DateFormat
  showMonthYearPicker?: boolean
  showYearPicker?: boolean
  showQuarterPicker?: boolean
  showWeekNumbers?: boolean
  isClearable?: boolean
  validation?: RegisterOptions<TFieldValues>
  locale?: string
  customInput?: DatePickerCustomProps['customInput']
  popperPlacement?: DatePickerCustomProps['popperPlacement']
  portalId?: string
  'data-cy'?: string
  hint?: string
}

export const DatePicker = React.forwardRef<
  ReactDatePicker,
  DatePickerProps<any>
>(
  (
    {
      name,
      control,
      label,
      required,
      disabled,
      placeholder,
      className,
      minDate,
      maxDate,
      excludeDates,
      includeDates,
      filterDate,
      showTime = false,
      timeIntervals = 30,
      timeFormat = '12h',
      mode = 'single',
      dateFormat,
      showMonthYearPicker,
      showYearPicker,
      showQuarterPicker,
      showWeekNumbers,
      isClearable = true,
      validation,
      locale,
      customInput,
      popperPlacement,
      portalId,
      'data-cy': dataCy,
      hint,
    },
    ref
  ) => {
    const {
      field: { value, onChange, onBlur },
      fieldState: { error },
    } = useController({
      name,
      control,
      rules: {
        ...validation,
        required: required ? 'This field is required' : false,
      },
    })

    const handleDateChange = (
      date: Date | [Date | null, Date | null] | null
    ) => {
      if (mode === 'range' && Array.isArray(date)) {
        const [start, end] = date
        onChange({ startDate: start, endDate: end })
      } else {
        onChange(date)
      }
    }

    const formatString = React.useMemo(() => {
      if (dateFormat) return dateFormat
      if (showTime) {
        return timeFormat === '24h' ? 'yyyy-MM-dd HH:mm' : 'MM/dd/yyyy h:mm aa'
      }
      return 'MM/dd/yyyy'
    }, [dateFormat, showTime, timeFormat])

    const baseConfig = {
      id: name,
      ref,
      placeholderText: placeholder,
      disabled,
      minDate,
      maxDate,
      excludeDates,
      includeDates,
      filterDate,
      showTimeSelect: showTime,
      timeIntervals,
      timeFormat: timeFormat === '24h' ? 'HH:mm' : 'h:mm aa',
      dateFormat: formatString,
      showMonthYearPicker,
      showYearPicker,
      showQuarterPicker,
      showWeekNumbers,
      isClearable,
      locale,
      customInput,
      popperPlacement,
      portalId,
      onBlur,
      className: cn('form-input', error && 'error', className),
      'data-cy': dataCy,
      'aria-invalid': !!error,
      'aria-required': required,
      'aria-describedby': error
        ? `${name}-error`
        : hint
          ? `${name}-hint`
          : undefined,
      autoComplete: 'off', // Disable browser autocomplete to prevent interference with calendar
    }

    return (
      <div className={cn('form-control', className)}>
        {label && (
          <label
            htmlFor={name}
            className={cn(
              'form-label',
              required && 'required',
              disabled && 'opacity-50'
            )}
          >
            {label}
          </label>
        )}
        {mode === 'range' ? (
          <ReactDatePicker
            {...baseConfig}
            onChange={(dates: [Date | null, Date | null]) =>
              handleDateChange(dates)
            }
            startDate={value?.startDate || null}
            endDate={value?.endDate || null}
            selectsRange
          />
        ) : (
          <ReactDatePicker
            {...baseConfig}
            selected={value as Date}
            onChange={(date: Date | null) => handleDateChange(date)}
          />
        )}
        {error && (
          <p className="form-error" role="alert" id={`${name}-error`}>
            {error.message}
          </p>
        )}
        {hint && !error && (
          <p className="form-hint" id={`${name}-hint`}>
            {hint}
          </p>
        )}
      </div>
    )
  }
)

DatePicker.displayName = 'DatePicker'
