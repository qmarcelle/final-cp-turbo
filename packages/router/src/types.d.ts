// Type declarations for React
declare module 'react' {
  export type ReactNode = 
    | React.ReactElement 
    | string 
    | number 
    | boolean 
    | null 
    | undefined;
  
  export interface ReactElement {
    type: any;
    props: any;
    key: string | null;
  }
  
  export interface ErrorInfo {
    componentStack: string;
  }
  
  export class Component<P = {}, S = {}> {
    constructor(props: P);
    props: P;
    state: S;
    setState<K extends keyof S>(
      state: ((prevState: Readonly<S>, props: Readonly<P>) => (Pick<S, K> | S | null)) | (Pick<S, K> | S | null),
      callback?: () => void
    ): void;
    forceUpdate(callback?: () => void): void;
    render(): ReactNode;
    readonly context: any;
    refs: {
      [key: string]: any;
    };
    static contextType?: Context<any>;
    static getDerivedStateFromProps?: (props: Readonly<any>, state: Readonly<any>) => any;
    static getDerivedStateFromError?: (error: any) => any;
  }
  
  export type ComponentType<P = {}> = ComponentClass<P> | FunctionComponent<P>;
  
  export interface ComponentClass<P = {}, S = {}> extends StaticLifecycle<P, S> {
    new (props: P, context?: any): Component<P, S>;
    propTypes?: any;
    contextType?: Context<any>;
    defaultProps?: Partial<P>;
    displayName?: string;
  }
  
  export interface StaticLifecycle<P, S> {
    getDerivedStateFromProps?: (props: P, state: S) => Partial<S> | null;
    getDerivedStateFromError?: (error: any) => Partial<S> | null;
  }
  
  export interface FunctionComponent<P = {}> {
    (props: P, context?: any): ReactElement | null;
    displayName?: string;
    defaultProps?: Partial<P>;
  }
  
  export interface FC<P = {}> extends FunctionComponent<P> {}
  
  export const Fragment: React.JSXElementConstructor<{children?: ReactNode}>;
  
  export interface Context<T> {
    Provider: Provider<T>;
    Consumer: Consumer<T>;
    displayName?: string;
  }
  
  export interface Provider<T> {
    (props: ProviderProps<T>): ReactElement | null;
  }
  
  export interface Consumer<T> {
    (props: ConsumerProps<T>): ReactElement | null;
  }
  
  export interface ProviderProps<T> {
    value: T;
    children?: ReactNode;
  }
  
  export interface ConsumerProps<T> {
    children: (value: T) => ReactNode;
  }
  
  export interface JSXElementConstructor<P> {
    (props: P): ReactElement | null;
  }
  
  export type ComponentProps<T extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>> =
    T extends keyof JSX.IntrinsicElements ? JSX.IntrinsicElements[T] :
    T extends React.JSXElementConstructor<infer P> ? P : {};
    
  export function useState<T>(initialState: T | (() => T)): [T, (newState: T | ((prevState: T) => T)) => void];
  export function useEffect(effect: () => void | (() => void), deps?: ReadonlyArray<any>): void;
  export function useCallback<T extends (...args: any[]) => any>(callback: T, deps: ReadonlyArray<any>): T;
}

// Type declarations for Next.js and React
declare module 'next/navigation' {
  export interface ReadonlyURLSearchParams {
    get: (key: string) => string | null;
    getAll: (key: string) => string[];
    has: (key: string) => boolean;
    forEach: (callback: (value: string, key: string) => void) => void;
    entries: () => IterableIterator<[string, string]>;
    keys: () => IterableIterator<string>;
    values: () => IterableIterator<string>;
    toString: () => string;
  }
  
  export function useRouter(): AppRouterInstance;
  export function usePathname(): string | null;
  export function useParams(): { [key: string]: string | string[] | undefined };
  export function useSearchParams(): ReadonlyURLSearchParams;
}

declare module 'next/link' {
  import { ComponentProps, ReactElement } from 'react';
  
  export interface LinkProps extends ComponentProps<'a'> {
    href: string;
    as?: string;
    replace?: boolean;
    scroll?: boolean;
    shallow?: boolean;
    passHref?: boolean;
    prefetch?: boolean;
    locale?: string | false;
  }
  
  export default function Link(props: LinkProps): ReactElement;
}

declare module 'next/dist/shared/lib/app-router-context' {
  export interface AppRouterInstance {
    push: (url: string, options?: { scroll?: boolean }) => void;
    replace: (url: string, options?: { scroll?: boolean }) => void;
    prefetch: (url: string) => void;
    back: () => void;
    forward: () => void;
    refresh: () => void;
  }
}

declare module 'next/dist/shared/lib/router/router' {
  export type PathName = string;
}

declare module 'next/server' {
  export class NextRequest {
    nextUrl: { pathname: string };
    cookies: { get: (name: string) => { value?: string } | undefined };
    headers: { get: (name: string) => string | null };
    url: string;
    auth?: {
      user?: Record<string, any>;
      session?: Record<string, any>;
    };
  }
  
  export class NextResponse {
    static redirect(url: URL): NextResponse;
    static next(): NextResponse;
    static json(body: any, init?: ResponseInit): NextResponse;
  }
}

declare module '@cp/auth' {
  export function auth(handler: (request: any) => any): any;
}

// Global definitions
interface Window {
  __NEXT_DATA__?: {
    basePath?: string;
  };
} 