// Global type declarations

/**
 * PingOne Signals initialization options
 */
interface PingOneSignalsOptions {
  envId: string;
  universalDeviceIdentification?: boolean;
  // Add more properties as needed
}

/**
 * PingOne Signals interface
 */
interface PingOneSignals {
  initSilent: (options: PingOneSignalsOptions) => void;
  getData: () => Promise<string>;
  // Add more methods as needed
}

/**
 * Extend Window interface with PingOne signals
 */
declare global {
  interface Window {
    _pingOneSignals: PingOneSignals;
  }
}
