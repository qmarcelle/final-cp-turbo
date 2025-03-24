'use client';

import { useMfaStore } from '../stores/mfaStore';
import { MfaDeviceType, MfaModeState } from '../types/mfa';

export interface MfaSelectionProps {
  /**
   * Custom redirect URL after successful authentication
   * @default "/dashboard"
   */
  redirectUrl?: string;

  /**
   * Optional title to display above the selection component
   * @default "Select a Verification Method"
   */
  title?: string;

  /**
   * Custom CSS class for the container
   */
  className?: string;
}

/**
 * MFA Selection component for choosing an MFA verification method
 */
export function MfaSelection({
  redirectUrl = '/dashboard',
  title = 'Select a Verification Method',
  className = '',
}: MfaSelectionProps) {
  const { updateStage } = useMfaStore();

  // Mock MFA methods - in a real implementation, this would come from the API
  const mfaMethods = [
    {
      id: '1',
      type: MfaDeviceType.SMS,
      name: 'SMS',
      target: '+1 XXX-XXX-1234',
      description: 'Receive a code via text message',
    },
    {
      id: '2',
      type: MfaDeviceType.EMAIL,
      name: 'Email',
      target: 'e***@example.com',
      description: 'Receive a code via email',
    },
    {
      id: '3',
      type: MfaDeviceType.AUTHENTICATOR_APP,
      name: 'Authenticator App',
      description: 'Use an authenticator app to generate a code',
    },
  ];

  // Handle method selection
  const handleSelectMethod = (type: MfaDeviceType) => {
    switch (type) {
      case MfaDeviceType.SMS:
        updateStage(MfaModeState.sms);
        break;
      case MfaDeviceType.EMAIL:
        updateStage(MfaModeState.email);
        break;
      case MfaDeviceType.AUTHENTICATOR_APP:
        updateStage(MfaModeState.authenticatorApp);
        break;
      default:
        updateStage(MfaModeState.selection);
    }
  };

  return (
    <div className={`mfa-selection-container ${className}`}>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="mb-6">
        Please select one of the following verification methods to continue:
      </p>

      <div className="space-y-4">
        {mfaMethods.map((method) => (
          <div
            key={method.id}
            className="p-4 border rounded-md hover:bg-gray-50 cursor-pointer transition"
            onClick={() => handleSelectMethod(method.type)}
          >
            <div className="flex items-center">
              <div className="flex-1">
                <h4 className="font-medium">{method.name}</h4>
                <p className="text-sm text-gray-600">{method.description}</p>
                {method.target && (
                  <p className="text-sm text-gray-500 mt-1">{method.target}</p>
                )}
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
