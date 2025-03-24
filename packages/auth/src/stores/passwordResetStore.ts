'use client';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

/**
 * Password reset store state interface
 */
export interface PasswordResetStore {
  // State properties
  password: string;
  dob: string;
  username: string;
  apiErrors: string[];

  // Actions
  updatePassword: (password: string) => void;
  updateDOB: (dob: string) => void;
  updateUsername: (username: string) => void;
  resetError: () => void;
}

/**
 * Password reset store implementation
 */
export const usePasswordResetStore = create(
  devtools(
    (set) => ({
      password: '',
      dob: '',
      username: '',
      apiErrors: [],

      updatePassword: (password: string) => set(() => ({ password })),
      updateDOB: (dob: string) => set(() => ({ dob })),
      updateUsername: (username: string) => set(() => ({ username })),
      resetError: () => set(() => ({ apiErrors: [] })),
    }),
    { name: 'password-reset-store' },
  ),
);
