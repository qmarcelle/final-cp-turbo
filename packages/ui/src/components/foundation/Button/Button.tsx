import * as React from 'react';
import clsx from 'clsx'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  'data-cy'?: string
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, disabled, type = 'button', ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        role="button"
        disabled={disabled}
        aria-disabled={disabled}
        className={clsx(
          'btn',
          {
            'btn-primary text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500': variant === 'primary',
            'btn-secondary text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-2 focus:ring-gray-500': variant === 'secondary',
            'btn-success text-white bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500': variant === 'success',
            'btn-warning text-gray-900 bg-yellow-400 hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-500': variant === 'warning',
            'btn-error text-white bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-500': variant === 'error',
            'btn-outline text-blue-600 border-2 border-blue-600 hover:bg-blue-50 focus:ring-2 focus:ring-blue-500': variant === 'outline',
            'btn-ghost text-gray-600 hover:bg-gray-100 focus:ring-2 focus:ring-gray-500': variant === 'ghost',
            'btn-sm text-sm px-3 py-1': size === 'sm',
            'btn-md text-base px-4 py-2': size === 'md',
            'btn-lg text-lg px-6 py-3': size === 'lg',
            'btn-disabled opacity-50 cursor-not-allowed': disabled,
          },
          'rounded-lg font-medium transition-colors duration-200',
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button' 