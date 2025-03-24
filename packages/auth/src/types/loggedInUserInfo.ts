/**
 * AuthFunction interface representing the auth functions from the backend
 */
export interface AuthFunction {
  functionName: string;
  available: boolean;
}

/**
 * GroupData interface representing group information from the backend
 */
export interface GroupData {
  groupID: string;
  groupCK: string;
  groupName: string;
  parentGroupID: string;
  subGroupID: string;
  subGroupCK: number;
  subGroupName: string;
  clientID: string;
  policyType: string;
  groupEIN: string;
}

/**
 * LoggedInUserInfo interface representing the user information returned by the login API
 */
export interface LoggedInUserInfo {
  authFunctions: AuthFunction[];
  isActive: boolean;
  subscriberLoggedIn: boolean;
  lob: string;
  groupData: GroupData;
  networkPrefix: string;
  subscriberID: string;
  subscriberCK: string;
  subscriberFirstName: string;
  subscriberLastName: string;
  subscriberTitle: string;
  subscriberDateOfBirth: string;
  subscriberOriginalEffectiveDate: string;
  members: any[]; // Can be typed more specifically later
  coverageTypes: any[]; // Can be typed more specifically later
  addresses: any[]; // Can be typed more specifically later
  healthCareAccounts: any[]; // Can be typed more specifically later
  esigroupNum: string;
  cmcondition: any[]; // Can be typed more specifically later
}
