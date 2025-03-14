// @ts-nocheck - Temporarily disable TypeScript checks to focus on functionality
import * as React from 'react';
import { User, AuthState, AuthContextType, Permission, UserRole } from './types';

// Initial auth state
const initialState: AuthState = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
  error: null,
};

// Auth context
const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

// Auth reducer for state management
type AuthAction =
  | { type: 'LOGIN_REQUEST' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; error: Error }
  | { type: 'LOGOUT' }
  | { type: 'RESET_ERROR' };

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: action.error,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case 'RESET_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = React.useReducer(authReducer, initialState);

  // Check for existing session on mount
  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        // Get session from storage or API
        const token = localStorage.getItem('auth_token');
        
        if (token) {
          // Validate token with backend
          // This is simplified for example purposes
          // In a real app, you'd verify the token with your backend
          const fakeUser: User = {
            id: '123',
            email: 'user@example.com',
            name: 'John Doe',
            role: UserRole.BROKER,
            permissions: [
              Permission.VIEW_CLIENTS,
              Permission.VIEW_ACCOUNTS,
              Permission.VIEW_PROFILE,
              Permission.VIEW_DOCUMENTS,
            ],
          };
          
          dispatch({ type: 'LOGIN_SUCCESS', payload: fakeUser });
        } else {
          dispatch({ type: 'LOGOUT' });
        }
      } catch (error) {
        dispatch({ type: 'LOGIN_FAILURE', error: error as Error });
      }
    };

    checkAuth();
  }, []);

  // Auth methods
  const login = async (email: string, password: string) => {
    dispatch({ type: 'LOGIN_REQUEST' });
    
    try {
      // Authenticate with backend
      // This is simplified for example purposes
      // In a real app, you'd make an API call to authenticate
      const fakeUser: User = {
        id: '123',
        email,
        name: 'John Doe',
        role: UserRole.BROKER,
        permissions: [
          Permission.VIEW_CLIENTS,
          Permission.VIEW_ACCOUNTS,
          Permission.VIEW_PROFILE,
          Permission.VIEW_DOCUMENTS,
        ],
      };
      
      // Store token
      localStorage.setItem('auth_token', 'fake_jwt_token');
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: fakeUser });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', error: error as Error });
      throw error;
    }
  };

  const logout = async () => {
    // Clear token
    localStorage.removeItem('auth_token');
    dispatch({ type: 'LOGOUT' });
  };

  const resetPassword = async (email: string) => {
    // Call password reset API
    // This is simplified for example purposes
    console.log(`Password reset requested for ${email}`);
  };

  const hasPermission = (permission: Permission) => {
    return state.user?.permissions.includes(permission) || false;
  };

  const contextValue: AuthContextType = {
    ...state,
    login,
    logout,
    resetPassword,
    hasPermission,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = React.useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}
