import pino, { Level, Logger, LoggerOptions } from 'pino';

/**
 * Sensitive fields that should be redacted from logs
 */
const redactFields = [
  'password',
  'token',
  'accessToken',
  'refreshToken',
  'sessionToken',
  'cookie',
  'authorization',
  'mfaCode',
  'email',
  'phoneNumber',
];

/**
 * Base logger configuration
 */
const baseLoggerOptions: LoggerOptions = {
  level: (process.env.LOG_LEVEL as Level) || 'info',
  redact: {
    paths: redactFields,
    remove: true,
  },
  formatters: {
    level: (label: string) => {
      return { level: label };
    },
  },
  timestamp: () => `,"timestamp":"${new Date().toISOString()}"`,
};

/**
 * Base logger instance
 */
const baseLogger: Logger = pino(baseLoggerOptions);

/**
 * Auth specific logger with context
 */
export const authLogger: Logger = baseLogger.child({
  package: '@cp/auth',
  version: process.env.npm_package_version,
});

/**
 * Auth actions for logging
 */
export enum AuthAction {
  LOGIN = 'login',
  LOGOUT = 'logout',
  SESSION_EXPIRED = 'session_expired',
  MFA_VERIFY = 'mfa_verify',
  MFA_SETUP = 'mfa_setup',
  PASSWORD_RESET = 'password_reset',
  EMAIL_VERIFY = 'email_verify',
  ACCOUNT_SELECT = 'account_select',
}

/**
 * Auth event for logging
 */
export interface AuthEvent {
  userId?: string;
  action: AuthAction;
  status: 'attempt' | 'success' | 'failure';
  error?: Error;
  metadata?: Record<string, unknown>;
}

/**
 * Log an auth event
 */
export function logAuthEvent(event: AuthEvent): void {
  const { userId, action, status, error, metadata } = event;

  const logData = {
    userId,
    action,
    status,
    ...(error && { error: { message: error.message, stack: error.stack } }),
    ...(metadata && { metadata }),
  };

  switch (status) {
    case 'success':
      authLogger.info(logData, `Auth ${action} successful`);
      break;
    case 'failure':
      authLogger.error(logData, `Auth ${action} failed`);
      break;
    case 'attempt':
      authLogger.debug(logData, `Auth ${action} attempted`);
      break;
  }
}
