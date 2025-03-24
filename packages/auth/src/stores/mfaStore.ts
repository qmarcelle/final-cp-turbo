'use client';

import { create } from 'zustand';
import { MfaModeState } from '../types/mfa';

/**
 * MFA store state interface
 */
export interface MfaStore {
  // State properties
  code: string;
  stage: MfaModeState;
  completeMfaProg: 'INIT' | 'IN_PROGRESS' | 'COMPLETE' | 'ERROR';
  resendCode: boolean;
  apiErrors: string[];

  // Actions
  updateCode: (code: string) => void;
  updateResendCode: (resendCode: boolean) => void;
  updateStage: (stage: MfaModeState) => void;
  resetApiErrors: () => void;
}

/**
 * MFA store implementation
 * This is a stub implementation that will be expanded later
 */
export const useMfaStore = create<MfaStore>((set) => ({
  code: '',
  stage: MfaModeState.selection,
  completeMfaProg: 'INIT',
  resendCode: false,
  apiErrors: [],

  updateCode: (code: string) => set({ code }),
  updateResendCode: (resendCode: boolean) => set({ resendCode }),
  updateStage: (stage: MfaModeState) => set({ stage }),
  resetApiErrors: () => set({ apiErrors: [] }),
}));
