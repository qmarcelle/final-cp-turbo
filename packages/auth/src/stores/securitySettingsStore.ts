import { create } from 'zustand';
import { AppProg } from '../types/app';

/**
 * Security setting types
 */
export enum SecuritySettingType {
  MFA_REQUIRED = 'mfa_required',
  ALLOWED_IPS = 'allowed_ips',
  SESSION_TIMEOUT = 'session_timeout',
  PASSWORD_EXPIRY = 'password_expiry',
  LOGIN_NOTIFICATIONS = 'login_notifications',
}

/**
 * Security setting value types
 */
export type SecuritySettingValue = boolean | string | number | string[];

/**
 * Security setting interface
 */
export interface SecuritySetting {
  id: string;
  type: SecuritySettingType;
  name: string;
  description: string;
  value: SecuritySettingValue;
  defaultValue: SecuritySettingValue;
  modifiedAt?: string;
}

/**
 * Interface for the Security Settings Store state
 */
export interface SecuritySettingsStore {
  // State properties
  settings: SecuritySetting[];
  apiErrors: string[];
  loadingState: AppProg;
  saveState: AppProg;

  // Actions
  loadSettings: (userId: string) => Promise<void>;
  updateSetting: (settingId: string, value: SecuritySettingValue) => void;
  saveSettings: (userId: string) => Promise<boolean>;
  resetToDefaults: () => void;
  resetApiErrors: () => void;
}

/**
 * Create the Security Settings store
 */
export const useSecuritySettingsStore = create<SecuritySettingsStore>(
  (set, get) => ({
    settings: [],
    apiErrors: [],
    loadingState: AppProg.init,
    saveState: AppProg.init,

    /**
     * Load security settings for a user
     * @param userId User ID to load settings for
     */
    loadSettings: async (userId: string) => {
      try {
        set({ loadingState: AppProg.loading, apiErrors: [] });

        // TODO: Implement actual API call to fetch security settings
        // This is a placeholder for the actual implementation
        // The userId would be used in the actual API call
        console.log(`Loading security settings for user: ${userId}`);
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data
        const settings: SecuritySetting[] = [
          {
            id: '1',
            type: SecuritySettingType.MFA_REQUIRED,
            name: 'Require Multi-Factor Authentication',
            description: 'Require MFA for all logins',
            value: true,
            defaultValue: true,
            modifiedAt: new Date().toISOString(),
          },
          {
            id: '2',
            type: SecuritySettingType.SESSION_TIMEOUT,
            name: 'Session Timeout',
            description:
              'Time in minutes before an inactive session is logged out',
            value: 30,
            defaultValue: 30,
            modifiedAt: new Date().toISOString(),
          },
          {
            id: '3',
            type: SecuritySettingType.LOGIN_NOTIFICATIONS,
            name: 'Login Notifications',
            description: 'Send email notifications for new login attempts',
            value: true,
            defaultValue: true,
            modifiedAt: new Date().toISOString(),
          },
        ];

        set({
          settings,
          loadingState: AppProg.success,
        });
      } catch (error) {
        console.error('Error loading security settings:', error);

        set({
          loadingState: AppProg.failed,
          apiErrors: ['Failed to load security settings. Please try again.'],
        });
      }
    },

    /**
     * Update a security setting
     * @param settingId Setting ID to update
     * @param value New value for the setting
     */
    updateSetting: (settingId: string, value: SecuritySettingValue) => {
      const { settings } = get();

      const updatedSettings = settings.map((setting) =>
        setting.id === settingId
          ? { ...setting, value, modifiedAt: new Date().toISOString() }
          : setting,
      );

      set({ settings: updatedSettings });
    },

    /**
     * Save security settings for a user
     * @param userId User ID to save settings for
     * @returns Promise with save result
     */
    saveSettings: async (userId: string) => {
      try {
        set({ saveState: AppProg.loading, apiErrors: [] });

        // TODO: Implement actual API call to save security settings
        // This is a placeholder for the actual implementation
        // The userId would be used in the actual API call
        console.log(`Saving security settings for user: ${userId}`);
        await new Promise((resolve) => setTimeout(resolve, 1000));

        set({ saveState: AppProg.success });

        return true;
      } catch (error) {
        console.error('Error saving security settings:', error);

        set({
          saveState: AppProg.failed,
          apiErrors: ['Failed to save security settings. Please try again.'],
        });

        return false;
      }
    },

    /**
     * Reset settings to default values
     */
    resetToDefaults: () => {
      const { settings } = get();

      const defaultSettings = settings.map((setting) => ({
        ...setting,
        value: setting.defaultValue,
        modifiedAt: new Date().toISOString(),
      }));

      set({ settings: defaultSettings });
    },

    /**
     * Reset API errors
     */
    resetApiErrors: () => set({ apiErrors: [] }),
  }),
);
