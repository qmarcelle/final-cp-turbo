import React from 'react';

declare global {
  const useState: typeof React.useState;
  const useEffect: typeof React.useEffect;
  const useContext: typeof React.useContext;
  const useReducer: typeof React.useReducer;
  const useCallback: typeof React.useCallback;
  const useMemo: typeof React.useMemo;
  const useRef: typeof React.useRef;
  const useImperativeHandle: typeof React.useImperativeHandle;
  const useLayoutEffect: typeof React.useLayoutEffect;
  const useDebugValue: typeof React.useDebugValue;
  const forwardRef: typeof React.forwardRef;
  const memo: typeof React.memo;
  const createContext: typeof React.createContext;
}

export {}; 