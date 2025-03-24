import { FormEvent } from 'react';
import { create } from 'zustand';
import { AppProg } from '../types/app';

/**
 * Email verification store state interface
 */
export interface VerifyEmailStore {
  // State properties
  code: string;
  resendCode: boolean;
  emailId: string;
  apiErrors: string[];
  interactionData: {
    interactionId: string;
    interactionToken: string;
  } | null;
  completeVerifyEmailProg: AppProg;
  isResentSuccessCode: boolean;

  // Actions
  updateCode: (code: string) => void;
  updateResendCode: (resendCode: boolean) => void;
  updateEmailId: (emailId: string) => void;
  updateInteractionData: (
    interactionId: string,
    interactionToken: string,
  ) => void;
  resetApiErrors: () => void;
  submitVerifyEmailAuth: (e?: FormEvent<HTMLFormElement>) => Promise<void>;
  handleResendCode: () => Promise<void>;
}

/**
 * Email verification store implementation
 */
export const useVerifyEmailStore = create<VerifyEmailStore>((set) => ({
  code: '',
  resendCode: false,
  emailId: '',
  apiErrors: [],
  interactionData: null,
  completeVerifyEmailProg: AppProg.init,
  isResentSuccessCode: false,

  updateCode: (code: string) => set(() => ({ code })),

  updateResendCode: (resendCode: boolean) => set(() => ({ resendCode })),

  updateEmailId: (emailId: string) => set(() => ({ emailId })),

  updateInteractionData: (interactionId: string, interactionToken: string) =>
    set(() => ({
      interactionData: {
        interactionId,
        interactionToken,
      },
    })),

  resetApiErrors: () => set(() => ({ apiErrors: [] })),

  submitVerifyEmailAuth: async (e?: FormEvent<HTMLFormElement>) => {
    try {
      e?.preventDefault();

      // Clear existing errors
      set({ apiErrors: [] });

      // Set to loading state
      set({ completeVerifyEmailProg: AppProg.loading });

      // TODO: Implement actual verification API call
      // This is a placeholder for the actual implementation
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate success
      set({ completeVerifyEmailProg: AppProg.success });

      // Note: We're intentionally not updating the login status here
      // as it should be handled by the consuming application
      // This removes the need for type assertions
    } catch (error) {
      console.error('Email verification error:', error);

      set({
        completeVerifyEmailProg: AppProg.failed,
        apiErrors: [
          'An error occurred during email verification. Please try again.',
        ],
      });
    }
  },

  handleResendCode: async () => {
    try {
      // Clear existing errors
      set({ apiErrors: [] });

      // TODO: Implement actual resend code API call
      // This is a placeholder for the actual implementation
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate success
      set({ isResentSuccessCode: true });

      // Reset after 3 seconds
      setTimeout(() => {
        set({ isResentSuccessCode: false });
      }, 3000);
    } catch (error) {
      console.error('Resend code error:', error);
      set({
        apiErrors: ['Failed to resend verification code. Please try again.'],
      });
    }
  },
}));
