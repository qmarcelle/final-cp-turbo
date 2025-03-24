'use client';

import { useLoginStore } from '../stores/loginStore';
import { useMfaStore } from '../stores/mfaStore';
import { MfaModeState } from '../types/mfa';

/* eslint-disable @typescript-eslint/no-unused-vars */
// Placeholder components until real implementations are added
const AuthenticatorAppMfa = ({ redirectUrl }: { redirectUrl: string }) => (
  <div>Authenticator App MFA Component (Placeholder)</div>
);

const MfaSelection = ({ redirectUrl }: { redirectUrl: string }) => (
  <div>MFA Selection Component (Placeholder)</div>
);

const OtherMfaEntry = ({
  mode,
  redirectUrl,
}: {
  mode: MfaModeState;
  redirectUrl: string;
}) => <div>Other MFA Entry Component - Mode: {mode} (Placeholder)</div>;
/* eslint-enable @typescript-eslint/no-unused-vars */

export interface MfaComponentProps {
  /**
   * Custom success redirect URL
   * @default "/dashboard"
   */
  redirectUrl?: string;

  /**
   * Optional title to display above the MFA component
   * @default "Multi-Factor Authentication"
   */
  title?: string;

  /**
   * Custom CSS class for the MFA container
   */
  className?: string;
}

/**
 * MFA Component for multi-factor authentication verification
 * Renders different MFA modes based on the current state
 */
export function MfaComponent({
  redirectUrl = '/dashboard',
  title = 'Multi-Factor Authentication',
  className = '',
}: MfaComponentProps) {
  // Get MFA store state
  const { stage, apiErrors } = useMfaStore();

  // Get login store state
  const { mfaNeeded } = useLoginStore();

  // Only show if MFA is needed
  if (!mfaNeeded) {
    return null;
  }

  // Render appropriate MFA component based on stage
  return (
    <div className={`mfa-container ${className}`}>
      <h2 className="text-2xl font-bold mb-6">{title}</h2>

      {/* Error display */}
      {apiErrors.length > 0 && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
          role="alert"
        >
          <ul className="list-disc pl-5">
            {apiErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* MFA mode components */}
      {stage === MfaModeState.selection && (
        <MfaSelection redirectUrl={redirectUrl} />
      )}

      {stage === MfaModeState.authenticatorApp && (
        <AuthenticatorAppMfa redirectUrl={redirectUrl} />
      )}

      {(stage === MfaModeState.sms ||
        stage === MfaModeState.email ||
        stage === MfaModeState.device) && (
        <OtherMfaEntry mode={stage} redirectUrl={redirectUrl} />
      )}
    </div>
  );
}
