import React, { forwardRef, useImperativeHandle, useRef, type ComponentType } from 'react';

/**
 * Props type that includes a ref property
 * @template T - The type of the ref value
 * @interface WithRefProps
 * @property {React.Ref<T>} [ref] - Optional ref prop
 */
type WithRefProps<T> = {
  ref?: React.Ref<T>;
};

/**
 * Higher-order component that handles React 19's ref changes safely
 * 
 * This HOC wraps a component and provides safe ref handling compatible with React 19's
 * changes to how refs work. It ensures refs are always treated as props and handles
 * both callback refs and ref objects correctly.
 * 
 * @template T - The type of the ref value (must extend object)
 * @template P - The props type of the wrapped component (must extend WithRefProps<T>)
 * 
 * @example
 * ```tsx
 * // Basic usage
 * const ModernButton = withReactModernRefs(Button);
 * 
 * // With TypeScript
 * interface ButtonProps {
 *   onClick: () => void;
 * }
 * const ModernButton = withReactModernRefs<HTMLButtonElement, ButtonProps>(Button);
 * 
 * // Usage with ref
 * const MyComponent = () => {
 *   const buttonRef = useRef<HTMLButtonElement>(null);
 *   return <ModernButton ref={buttonRef} onClick={() => {}} />;
 * };
 * ```
 * 
 * @param {ComponentType<P>} WrappedComponent - The component to wrap
 * @returns {React.ForwardRefExoticComponent} A new component with safe ref handling
 */
export function withReactModernRefs<T extends object, P extends WithRefProps<T>>(
  WrappedComponent: ComponentType<P>
) {
  return forwardRef<T, Omit<P, 'ref'>>((props, ref) => {
    const innerRef = useRef<T>(null);

    useImperativeHandle(ref, () => {
      if (!innerRef.current) {
        throw new Error('Inner ref is not available');
      }
      return innerRef.current;
    }, []);

    // Cast props to unknown first to avoid type error
    return <WrappedComponent {...(props as unknown as P)} ref={innerRef} />;
  });
}

// Example usage:
// const ModernButton = withReactModernRefs(Button); 