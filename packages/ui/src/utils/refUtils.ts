import { MutableRefObject, RefCallback } from 'react';

/**
 * Type representing different kinds of React refs
 * @template T - The type of the ref value
 * @typedef {MutableRefObject<T | null> | RefCallback<T | null> | null} RefType
 */
type RefType<T> = MutableRefObject<T | null> | RefCallback<T | null> | null;

/**
 * Safely assigns a value to a ref, handling both callback refs and ref objects
 * Compatible with React 19's ref handling
 * 
 * @template T - The type of the ref value
 * @param {RefType<T>} ref - The ref to assign to
 * @param {T | null} value - The value to assign
 * 
 * @example
 * ```tsx
 * const buttonRef = useRef<HTMLButtonElement>(null);
 * assignRef(buttonRef, buttonElement);
 * ```
 */
export function assignRef<T>(ref: RefType<T>, value: T | null): void {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref !== null) {
    ref.current = value;
  }
}

/**
 * Combines multiple refs into a single ref callback
 * Useful when you need to attach multiple refs to a single element
 * 
 * @template T - The type of the ref value
 * @param {...RefType<T>[]} refs - The refs to combine
 * @returns {RefCallback<T | null>} A callback ref that updates all provided refs
 * 
 * @example
 * ```tsx
 * function Component() {
 *   const localRef = useRef<HTMLDivElement>(null);
 *   const forwardedRef = useRef<HTMLDivElement>(null);
 *   
 *   const combinedRef = mergeRefs(localRef, forwardedRef);
 *   
 *   return <div ref={combinedRef}>Content</div>;
 * }
 * ```
 */
export function mergeRefs<T>(...refs: RefType<T>[]): RefCallback<T | null> {
  return (value: T | null) => {
    refs.forEach(ref => assignRef(ref, value));
  };
}

/**
 * Creates a ref object that's safe to use with React 19
 * Ensures the ref is always treated as a prop
 * 
 * @template T - The type of the ref value
 * @param {T | null} initialValue - The initial value for the ref
 * @returns {MutableRefObject<T | null>} A new ref object
 * 
 * @example
 * ```tsx
 * function Component() {
 *   const buttonRef = createSafeRef<HTMLButtonElement>();
 *   return <button ref={buttonRef}>Click me</button>;
 * }
 * ```
 */
export function createSafeRef<T>(initialValue: T | null = null): MutableRefObject<T | null> {
  return {
    current: initialValue,
  };
}

/**
 * Type guard to check if a value is a valid ref object
 * 
 * @template T - The type of the ref value
 * @param {any} ref - The value to check
 * @returns {boolean} True if the value is a ref object
 * 
 * @example
 * ```tsx
 * function handleRef(ref: unknown) {
 *   if (isRefObject<HTMLElement>(ref)) {
 *     // ref is now typed as MutableRefObject<HTMLElement | null>
 *     console.log(ref.current?.clientWidth);
 *   }
 * }
 * ```
 */
export function isRefObject<T>(ref: any): ref is MutableRefObject<T | null> {
  return ref !== null && typeof ref === 'object' && 'current' in ref;
} 