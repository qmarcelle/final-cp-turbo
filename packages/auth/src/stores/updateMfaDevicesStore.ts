import { create } from 'zustand';
import { AppProg } from '../types/app';
import { AuthMethodType, PingOneMfaDevice } from '../types/pingOne';

/**
 * Update operation types
 */
export enum UpdateOperationType {
  ADD = 'add',
  MODIFY = 'modify',
  REMOVE = 'remove',
}

/**
 * MFA device update interface
 */
export interface MfaDeviceUpdate {
  deviceId?: string; // Only for MODIFY and REMOVE operations
  operation: UpdateOperationType;
  type?: AuthMethodType; // Only for ADD and MODIFY operations
  name?: string; // Only for ADD and MODIFY operations
  target?: string; // Only for ADD operations (phone or email)
}

/**
 * Interface for the Update MFA Devices Store state
 */
export interface UpdateMfaDevicesStore {
  // State properties
  pendingUpdates: MfaDeviceUpdate[];
  currentDevice: PingOneMfaDevice | null;
  apiErrors: string[];
  processingState: AppProg;
  verificationCode: string;
  verificationState: AppProg;

  // Actions
  addPendingUpdate: (update: MfaDeviceUpdate) => void;
  removePendingUpdate: (index: number) => void;
  clearPendingUpdates: () => void;
  setCurrentDevice: (device: PingOneMfaDevice | null) => void;
  setVerificationCode: (code: string) => void;
  processUpdates: (userId: string) => Promise<boolean>;
  verifyDevice: (deviceId: string, code: string) => Promise<boolean>;
  resetApiErrors: () => void;
}

/**
 * Create the Update MFA Devices store
 */
export const useUpdateMfaDevicesStore = create<UpdateMfaDevicesStore>(
  (set, get) => ({
    pendingUpdates: [],
    currentDevice: null,
    apiErrors: [],
    processingState: AppProg.init,
    verificationCode: '',
    verificationState: AppProg.init,

    /**
     * Add a pending update
     * @param update MFA device update to add
     */
    addPendingUpdate: (update: MfaDeviceUpdate) => {
      const { pendingUpdates } = get();

      // Remove any existing updates for the same device
      const filteredUpdates = update.deviceId
        ? pendingUpdates.filter((u) => u.deviceId !== update.deviceId)
        : pendingUpdates;

      set({ pendingUpdates: [...filteredUpdates, update] });
    },

    /**
     * Remove a pending update by index
     * @param index Index of the update to remove
     */
    removePendingUpdate: (index: number) => {
      const { pendingUpdates } = get();

      const newUpdates = [...pendingUpdates];
      newUpdates.splice(index, 1);

      set({ pendingUpdates: newUpdates });
    },

    /**
     * Clear all pending updates
     */
    clearPendingUpdates: () => set({ pendingUpdates: [] }),

    /**
     * Set the current device being processed
     * @param device Device to set as current
     */
    setCurrentDevice: (device: PingOneMfaDevice | null) =>
      set({ currentDevice: device }),

    /**
     * Set the verification code
     * @param code Verification code
     */
    setVerificationCode: (code: string) => set({ verificationCode: code }),

    /**
     * Process all pending updates
     * @param userId User ID to process updates for
     * @returns Promise with processing result
     */
    processUpdates: async (userId: string) => {
      try {
        const { pendingUpdates } = get();

        if (pendingUpdates.length === 0) {
          return true;
        }

        set({ processingState: AppProg.loading, apiErrors: [] });

        // TODO: Implement actual API call to process MFA device updates
        // This is a placeholder for the actual implementation
        console.log(`Processing MFA device updates for user: ${userId}`);
        console.log('Updates:', pendingUpdates);
        await new Promise((resolve) => setTimeout(resolve, 1000));

        set({
          processingState: AppProg.success,
          pendingUpdates: [],
        });

        return true;
      } catch (error) {
        console.error('Error processing MFA device updates:', error);

        set({
          processingState: AppProg.failed,
          apiErrors: [
            'Failed to process MFA device updates. Please try again.',
          ],
        });

        return false;
      }
    },

    /**
     * Verify a device using a code
     * @param deviceId Device ID to verify
     * @param code Verification code
     * @returns Promise with verification result
     */
    verifyDevice: async (deviceId: string, code: string) => {
      try {
        set({ verificationState: AppProg.loading, apiErrors: [] });

        // TODO: Implement actual API call to verify the device
        // This is a placeholder for the actual implementation
        console.log(`Verifying device ${deviceId} with code: ${code}`);
        await new Promise((resolve) => setTimeout(resolve, 1000));

        set({ verificationState: AppProg.success });

        return true;
      } catch (error) {
        console.error('Error verifying MFA device:', error);

        set({
          verificationState: AppProg.failed,
          apiErrors: [
            'Failed to verify MFA device. Please check your code and try again.',
          ],
        });

        return false;
      }
    },

    /**
     * Reset API errors
     */
    resetApiErrors: () => set({ apiErrors: [] }),
  }),
);
