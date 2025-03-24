'use client';

import { create } from 'zustand';
import { callSignOut } from '../services/signOut';
import { MfaModeState } from '../types/mfa';
import { useEmailUniquenessStore } from './emailUniquenessStore';
import { useMfaStore } from './mfaStore';
import { usePasswordResetStore } from './passwordResetStore';
import { useVerifyEmailStore } from './verifyEmailStore';

// Import store types
import type { EmailUniquenessStore } from './emailUniquenessStore';
import type { MfaStore } from './mfaStore';
import type { PasswordResetStore } from './passwordResetStore';
import type { VerifyEmailStore } from './verifyEmailStore';

interface LoginState {
  username: string;
  password: string;
  dob: string;
  emailId: string;
  verifyUniqueEmail: boolean;
  mfaNeeded: boolean;
  forcePasswordReset: boolean;
  verifyEmail: boolean;
  inactive: boolean;
  isRiskScoreHigh: boolean;
  riskLevelNotDetermined: boolean;
  apiErrors: string[];
}

interface LoginActions {
  updateUsername: (username: string) => void;
  updatePassword: (password: string) => void;
  updateDOB: (dob: string) => void;
  updateMfaNeeded: (needed: boolean) => void;
  updateForcePasswordReset: (reset: boolean) => void;
  updateVerifyEmail: (verify: boolean) => void;
  updateInactive: (inactive: boolean) => void;
  updateIsRiskScoreHigh: (high: boolean) => void;
  updateRiskLevelNotDetermined: (notDetermined: boolean) => void;
  updateUnhandledErrors: (errors: string[]) => void;
  resetApiErrors: () => void;
  resetToHome: () => void;
}

const initialState: LoginState = {
  username: '',
  password: '',
  dob: '',
  emailId: '',
  verifyUniqueEmail: false,
  mfaNeeded: false,
  forcePasswordReset: false,
  verifyEmail: false,
  inactive: false,
  isRiskScoreHigh: false,
  riskLevelNotDetermined: false,
  apiErrors: [],
};

export const useLoginStore = create<LoginState & LoginActions>((set, get) => ({
  ...initialState,

  updateUsername: (username) => set({ username }),
  updatePassword: (password) => set({ password }),
  updateDOB: (dob) => set({ dob }),
  updateMfaNeeded: (mfaNeeded) => set({ mfaNeeded }),
  updateForcePasswordReset: (forcePasswordReset) => set({ forcePasswordReset }),
  updateVerifyEmail: (verifyEmail) => set({ verifyEmail }),
  updateInactive: (inactive) => set({ inactive }),
  updateIsRiskScoreHigh: (isRiskScoreHigh) => set({ isRiskScoreHigh }),
  updateRiskLevelNotDetermined: (riskLevelNotDetermined) =>
    set({ riskLevelNotDetermined }),
  updateUnhandledErrors: (apiErrors) => set({ apiErrors }),
  resetApiErrors: () => set({ apiErrors: [] }),
  resetToHome: () => {
    set({
      mfaNeeded: false,
      apiErrors: [],
      username: '',
      password: '',
      dob: '',
      verifyEmail: false,
      forcePasswordReset: false,
      verifyUniqueEmail: false,
      emailId: '',
    });

    // Reset dependent stores with proper typing
    const mfaState = useMfaStore.getState() as MfaStore;
    const verifyEmailState = useVerifyEmailStore.getState() as VerifyEmailStore;
    const passwordResetState =
      usePasswordResetStore.getState() as PasswordResetStore;
    const emailUniquenessState =
      useEmailUniquenessStore.getState() as EmailUniquenessStore;

    useMfaStore.setState({
      stage: MfaModeState.selection,
      completeMfaProg: 'INIT',
    });
    mfaState.updateCode('');
    mfaState.updateResendCode(false);

    verifyEmailState.updateCode('');
    verifyEmailState.resetApiErrors();

    passwordResetState.updatePassword('');
    passwordResetState.updateDOB('');
    passwordResetState.resetError();

    emailUniquenessState.updateEmailAddress('');
    emailUniquenessState.updateConfirmEmailAddress('');
    emailUniquenessState.resetError();
  },

  signOut: async () => {
    try {
      await callSignOut();
      set({
        username: '',
        password: '',
        dob: '',
        emailId: '',
        verifyUniqueEmail: false,
        mfaNeeded: false,
        forcePasswordReset: false,
        verifyEmail: false,
        inactive: false,
        isRiskScoreHigh: false,
        riskLevelNotDetermined: false,
        apiErrors: [],
      });
      (get() as LoginState & LoginActions).resetToHome();
      return;
    } catch (error) {
      // Log the error
      console.error('Error from SignOut Action', error);
    }
  },
}));
