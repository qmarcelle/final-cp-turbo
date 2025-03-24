import { create } from 'zustand';
import {
  getPingOneMfaDevices,
  registerPingOneMfaDevice,
} from '../services/pingOne';
import { AppProg } from '../types/app';
import { AuthMethodType, PingOneMfaDevice } from '../types/pingOne';

/**
 * Interface for the MFA Devices Store state
 */
export interface MfaDevicesStore {
  // State properties
  devices: PingOneMfaDevice[];
  selectedDevice: PingOneMfaDevice | null;
  apiErrors: string[];
  loadingState: AppProg;
  registrationState: AppProg;

  // Actions
  loadDevices: (userId: string) => Promise<void>;
  selectDevice: (deviceId: string) => void;
  registerDevice: (
    userId: string,
    type: AuthMethodType,
    target: string,
  ) => Promise<PingOneMfaDevice | null>;
  deleteDevice: (deviceId: string) => Promise<boolean>;
  resetApiErrors: () => void;
}

/**
 * Create the MFA Devices store
 */
export const useMfaDevicesStore = create<MfaDevicesStore>((set, get) => ({
  devices: [],
  selectedDevice: null,
  apiErrors: [],
  loadingState: AppProg.init,
  registrationState: AppProg.init,

  /**
   * Load MFA devices for a user
   * @param userId User ID to load devices for
   */
  loadDevices: async (userId: string) => {
    try {
      set({ loadingState: AppProg.loading, apiErrors: [] });

      const devices = await getPingOneMfaDevices(userId);

      set({
        devices,
        loadingState: AppProg.success,
      });

      // If we have devices and no device is selected, select the first one
      if (devices.length > 0 && !get().selectedDevice) {
        set({ selectedDevice: devices[0] });
      }
    } catch (error) {
      console.error('Error loading MFA devices:', error);

      set({
        loadingState: AppProg.failed,
        apiErrors: ['Failed to load MFA devices. Please try again.'],
      });
    }
  },

  /**
   * Select a device by ID
   * @param deviceId Device ID to select
   */
  selectDevice: (deviceId: string) => {
    const { devices } = get();
    const device = devices.find((d) => d.id === deviceId) || null;

    set({ selectedDevice: device });
  },

  /**
   * Register a new MFA device
   * @param userId User ID to register device for
   * @param type Device type
   * @param target Target (phone number or email)
   * @returns Promise with the new device or null if failed
   */
  registerDevice: async (
    userId: string,
    type: AuthMethodType,
    target: string,
  ) => {
    try {
      set({ registrationState: AppProg.loading, apiErrors: [] });

      const device = await registerPingOneMfaDevice(userId, type, target);

      if (device) {
        // Add the new device to the list and select it
        set((state) => ({
          devices: [...state.devices, device],
          selectedDevice: device,
          registrationState: AppProg.success,
        }));

        return device;
      } else {
        throw new Error('Failed to register device');
      }
    } catch (error) {
      console.error('Error registering MFA device:', error);

      set({
        registrationState: AppProg.failed,
        apiErrors: ['Failed to register MFA device. Please try again.'],
      });

      return null;
    }
  },

  /**
   * Delete an MFA device
   * @param deviceId Device ID to delete
   * @returns Promise with delete result
   */
  deleteDevice: async (deviceId: string) => {
    try {
      // TODO: Implement the actual delete API call
      // This is a placeholder for the actual implementation
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Remove the device from the list
      set((state) => ({
        devices: state.devices.filter((d) => d.id !== deviceId),
        selectedDevice:
          state.selectedDevice?.id === deviceId ? null : state.selectedDevice,
      }));

      return true;
    } catch (error) {
      console.error('Error deleting MFA device:', error);

      set({
        apiErrors: ['Failed to delete MFA device. Please try again.'],
      });

      return false;
    }
  },

  /**
   * Reset API errors
   */
  resetApiErrors: () => set({ apiErrors: [] }),
}));
