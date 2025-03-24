'use client';

import { create } from 'zustand';

/**
 * Email uniqueness store state interface
 */
export interface EmailUniquenessStore {
  // State properties
  emailAddress: string;
  confirmEmailAddress: string;
  apiErrors: string[];

  // Actions
  updateEmailAddress: (emailAddress: string) => void;
  updateConfirmEmailAddress: (confirmEmailAddress: string) => void;
  resetError: () => void;
}

/**
 * Email uniqueness store implementation
 * This is a stub implementation that will be expanded later
 */
export const useEmailUniquenessStore = create<EmailUniquenessStore>((set) => ({
  emailAddress: '',
  confirmEmailAddress: '',
  apiErrors: [],

  updateEmailAddress: (emailAddress: string) => set({ emailAddress }),
  updateConfirmEmailAddress: (confirmEmailAddress: string) =>
    set({ confirmEmailAddress }),
  resetError: () => set({ apiErrors: [] }),
}));
