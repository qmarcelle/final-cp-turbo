import { FormEvent } from 'react';
import { create } from 'zustand';
import { AppProg } from '../types/app';

/**
 * Primary Account Selection Store interface
 */
export interface PrimaryAccountSelectionState {
  /**
   * API errors that occurred during submission
   */
  apiErrors: string[];

  /**
   * Progress state of the continue with username action
   */
  continueWithUsernameProg: AppProg;

  /**
   * Reset API errors
   */
  resetApiErrors: () => void;

  /**
   * Submit the primary account selection
   */
  submitPrimaryAccountSelection: (
    e?: FormEvent<HTMLFormElement>,
  ) => Promise<void>;

  /**
   * Update login status after account selection
   */
  updateLoginStatus: (successful: boolean) => void;
}

/**
 * Create the primary account selection store
 */
export const usePrimaryAccountSelectionStore =
  create<PrimaryAccountSelectionState>((set) => ({
    apiErrors: [],
    continueWithUsernameProg: AppProg.init,

    resetApiErrors: () => set({ apiErrors: [] }),

    updateLoginStatus: (successful: boolean) => {
      if (successful) {
        set({ continueWithUsernameProg: AppProg.success });
      } else {
        set({ continueWithUsernameProg: AppProg.failed });
      }
    },

    submitPrimaryAccountSelection: async (e?: FormEvent<HTMLFormElement>) => {
      try {
        e?.preventDefault();

        set({ apiErrors: [] });
        set({ continueWithUsernameProg: AppProg.loading });

        // TODO: Implement the actual account deactivation API call
        // This is a placeholder for the actual implementation
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Simulate success response
        set({ continueWithUsernameProg: AppProg.success });

        return Promise.resolve();
      } catch (err) {
        console.error('Error in account deactivation API', err);
        set({ continueWithUsernameProg: AppProg.failed });
        set({
          apiErrors: ['An error occurred while processing your request.'],
        });
        return Promise.reject(err);
      }
    },
  }));
