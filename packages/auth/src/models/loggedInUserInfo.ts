export interface AuthFunction {
  functionName: string;
  available: boolean;
}

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

export interface LoggedInUserInfo {
  authFunctions?: AuthFunction[];
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
  members: any[]; // TODO: Define Member type
  coverageTypes: any[]; // TODO: Define CoverageType type
  addresses: any[]; // TODO: Define Address type
  healthCareAccounts: any[]; // TODO: Define HealthCareAccount type
  esigroupNum: string;
  cmcondition: any[]; // TODO: Define CMCondition type
}
