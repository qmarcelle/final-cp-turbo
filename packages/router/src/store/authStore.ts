import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/**
 * User profile interface
 */
export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  roles: string[];
  permissions: string[];
  [key: string]: any;
}

/**
 * Credentials interface for login
 */
export interface Credentials {
  email: string;
  password: string;
}

/**
 * Authentication state interface
 */
export interface AuthState {
  // State
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserProfile | null;
  error: string | null;
  
  // Auth tokens are not exposed directly in the state
  // They're kept private within the store implementation
  // This is more secure than storing in localStorage or exposing in state
  
  // Actions
  login: (credentials: Credentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<boolean>;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: string) => boolean;
  fetchWithAuth: (url: string, options?: RequestInit) => Promise<Response>;
}

// Private token storage - not exposed outside this module
// This prevents tokens from being accessible via browser devtools
let _accessToken: string | null = null;
let _refreshToken: string | null = null;
let _tokenExpiry: number | null = null;

/**
 * Check if the token needs refreshing
 */
const tokenNeedsRefresh = (): boolean => {
  if (!_accessToken || !_tokenExpiry) {
    return true;
  }
  
  // Add a buffer of 60 seconds to ensure we refresh before expiry
  return Date.now() > _tokenExpiry - 60000;
};

/**
 * Zustand store for authentication state
 * Uses the persist middleware to maintain authentication between page refreshes
 * but excludes sensitive data from being persisted
 */
export const useAuthStore = create<AuthState>()(
  // We only persist safe parts of the auth state like isAuthenticated and user profile
  // Tokens are managed in memory only
  persist(
    (set: any, get: any) => ({
      // Initial state
      isAuthenticated: false,
      isLoading: false,
      user: null,
      error: null,
      
      // Login action
      login: async (credentials: Credentials) => {
        set({ isLoading: true, error: null });
        
        try {
          // Example Auth.js integration
          // In a real implementation, this would interact with Auth.js
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
          });
          
          if (!response.ok) {
            const error = await response.text();
            throw new Error(error || 'Login failed');
          }
          
          const data = await response.json();
          
          // Store tokens securely in memory (not in localStorage)
          _accessToken = data.accessToken;
          _refreshToken = data.refreshToken;
          _tokenExpiry = Date.now() + (data.expiresIn * 1000);
          
          // Update state with user info (but not tokens)
          set({ 
            isAuthenticated: true, 
            user: data.user,
            isLoading: false,
          });
        } catch (error) {
          set({ 
            isAuthenticated: false, 
            user: null, 
            error: (error as Error).message,
            isLoading: false,
          });
          throw error;
        }
      },
      
      // Logout action
      logout: async () => {
        set({ isLoading: true });
        
        try {
          // Call logout endpoint if needed
          if (_accessToken) {
            await fetch('/api/auth/logout', {
              method: 'POST',
              headers: { 
                'Authorization': `Bearer ${_accessToken}`,
                'Content-Type': 'application/json' 
              },
            });
          }
          
          // Clear tokens from memory
          _accessToken = null;
          _refreshToken = null;
          _tokenExpiry = null;
          
          // Clear state
          set({ 
            isAuthenticated: false, 
            user: null,
            isLoading: false,
          });
        } catch (error) {
          console.error('Logout error:', error);
          // Still clear everything on error
          _accessToken = null;
          _refreshToken = null;
          _tokenExpiry = null;
          
          set({ 
            isAuthenticated: false, 
            user: null,
            isLoading: false,
          });
        }
      },
      
      // Refresh the session
      refreshSession: async () => {
        if (!_refreshToken) {
          return false;
        }
        
        try {
          const response = await fetch('/api/auth/refresh', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken: _refreshToken }),
          });
          
          if (!response.ok) {
            throw new Error('Session refresh failed');
          }
          
          const data = await response.json();
          
          // Update tokens securely in memory
          _accessToken = data.accessToken;
          _tokenExpiry = Date.now() + (data.expiresIn * 1000);
          
          // Optionally update user data if returned
          if (data.user) {
            set({ user: data.user });
          }
          
          return true;
        } catch (error) {
          console.error('Session refresh error:', error);
          
          // If refresh fails, clear auth state
          _accessToken = null;
          _refreshToken = null;
          _tokenExpiry = null;
          
          set({ 
            isAuthenticated: false, 
            user: null 
          });
          
          return false;
        }
      },
      
      // Check if user has a specific permission
      hasPermission: (permission: string) => {
        const { user } = get();
        return !!user?.permissions?.includes(permission);
      },
      
      // Check if user has a specific role
      hasRole: (role: string) => {
        const { user } = get();
        return !!user?.roles?.includes(role);
      },
      
      // Fetch with authentication
      fetchWithAuth: async (url: string, options: RequestInit = {}) => {
        // Check if token needs refreshing
        if (tokenNeedsRefresh()) {
          const refreshed = await get().refreshSession();
          if (!refreshed) {
            throw new Error('Authentication required');
          }
        }
        
        // Add authorization header
        const headers = new Headers(options.headers);
        if (_accessToken) {
          headers.set('Authorization', `Bearer ${_accessToken}`);
        }
        
        // Make the authenticated request
        return fetch(url, {
          ...options,
          headers,
        });
      },
    }),
    {
      name: 'auth-storage',
      // Only store non-sensitive data
      partialize: (state: AuthState) => ({ 
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useAuthStore; 