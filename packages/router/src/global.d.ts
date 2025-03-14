// Global type declarations
declare namespace NodeJS {
  interface Process {
    env: {
      NEXT_PUBLIC_BASE_PATH?: string;
      [key: string]: string | undefined;
    };
  }
  
  interface Global {
    process: Process;
  }
}

// Add JSX namespace for HTML elements
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare const process: NodeJS.Process;
declare function require(id: string): any; 