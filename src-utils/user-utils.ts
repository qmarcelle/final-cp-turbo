import { MemberData } from '@/actions/loggedUserInfo';
import { getMemberAndDependents } from '@/actions/memberDetails';
import { LoggedInMember } from '@/models/app/loggedin_member';
import { AuthFunction } from '@/models/member/api/loggedInUserInfo';
import { 
  PBEData, 
  RelatedPerson, 
  RelationshipInfo 
} from '@/models/member/api/pbeData';
import { UserProfile } from '@/models/user_profile';
import { UserRole } from '@/userManagement/models/sessionUser';
import { formatDateToLocale } from './formatters';
import { logger } from '../packages/logger/logger';

/**
 * Member ID and Formatting Utilities
 */

/**
 * Concatenates subscriberId and suffix with proper padding
 */
export const formatMemberId = (
  subscriberId: string,
  suffix: number,
): string => {
  return `${subscriberId}${suffix.toString().padStart(2, '0')}`;
};

/**
 * Gets subscriber ID with suffix (alias for formatMemberId)
 */
export const getSubscriberSuffix = (
  subscriberId: string,
  suffix: number,
): string => {
  return `${subscriberId.trim()}${suffix.toString().padStart(2, '0')}`;
};

/**
 * Member Data Utilities
 */

/**
 * Normalizes gender to M or F
 */
export const getGender = (gender: string): string => {
  return gender.toUpperCase() === 'M' ? 'M' : 'F';
};

/**
 * Gets member relation display text
 */
export const getMemberRelation = (relation: string): string => {
  return relation.toUpperCase() === 'M' ? 'Employee' : 'Dependent';
};

/**
 * Determines organization based on insurance type
 */
export const getOrganization = (
  isOHDFullyInsured: boolean,
  groupId: string,
): string => {
  return isOHDFullyInsured ? 'BCBST-FI' : groupId;
};

/**
 * Gets plan ID based on member data type
 */
export const getPlanId = (memberData: LoggedInMember): string => {
  let planId = memberData.mpdpdId ?? '';
  if (memberData.isMedical) planId = memberData.mpdpdId ?? '';
  else if (memberData.isDental) planId = memberData.dpdpdId ?? '';
  else if (memberData.isVision) planId = memberData.vpdpdId ?? '';
  return planId;
};

/**
 * Gets network prefix based on member data
 */
export const getPrefix = (memberData: LoggedInMember): string => {
  const prefix = memberData.networkPrefix;
  if (prefix) return prefix;
  if (memberData.dpdpdId) return '297';
  if (memberData.vpdpdId) return '296';
  if (memberData.spdpdId) return '285';
  return '';
};

/**
 * Authorization and Permission Utilities
 */

/**
 * Finds authorization function by name in member data
 */
export const findAuthFuncByName = (
  memberData: LoggedInMember,
  name: string,
): AuthFunction | undefined => {
  return memberData?.authFunctions?.find((func) => func.functionName === name);
};

/**
 * Checks if member is eligible for a specific authorization
 */
export const isEligible = (
  memberData: LoggedInMember,
  authName: string,
): boolean => {
  const authFunc = findAuthFuncByName(memberData, authName);
  return authFunc?.available ?? false;
};

/**
 * Checks if user has Personal Representative access
 */
export const checkPersonalRepAccess = (
  userRole: UserRole | undefined,
): boolean => {
  return userRole !== UserRole.PERSONAL_REP;
};

/**
 * Member Details Retrieval
 */

/**
 * Gets specific member details from member list
 */
export const getMemberDetails = async (
  memeCk: number,
  reqMemberCk: number,
): Promise<MemberData | undefined> => {
  const members = await getMemberAndDependents(memeCk.toString());
  return members.find((member) => member.memberCK === reqMemberCk);
};

/**
 * User Role Utilities
 */

/**
 * Returns the display text for viewing as a specific role
 */
export const getViewAsRoleNameFromType = (role: UserRole): string => {
  switch (role) {
    case UserRole.AUTHORIZED_USER:
      return 'View as Authorized User:';
    case UserRole.PERSONAL_REP:
      return 'View as Personal Representative:';
    case UserRole.MEMBER:
    case UserRole.NON_MEM:
      return 'My Profile';
  }
};

/**
 * Converts UserRole enum to display name
 */
export const computeRoleNameFromType = (role: UserRole): string => {
  switch (role) {
    case UserRole.AUTHORIZED_USER:
      return 'Authorized User';
    case UserRole.PERSONAL_REP:
      return 'Personal Representative';
    case UserRole.MEMBER:
    case UserRole.NON_MEM:
      return 'My Profile';
  }
};

/**
 * Profile Computation from PBE Data
 */

/**
 * Computes user profiles from PBE response data
 * Creates a list of all available user profiles with their plans
 */
export const computeUserProfilesFromPbe = (
  pbe: PBEData,
  selectedUserId?: string,
  selectedPlanId?: string,
): UserProfile[] => {
  try {
    const profiles: UserProfile[] = [];

    pbe.getPBEDetails[0].relationshipInfo.forEach((relationship) => {
      const memberProfile = findMemberRoleInProfiles(profiles);
      
      if (['Subscriber', 'Dependent'].includes(relationship.personRoleType)) {
        if (memberProfile == null) {
          addMemberToProfiles(
            profiles,
            pbe,
            selectedUserId,
            relationship,
            selectedPlanId,
          );
        } else {
          memberProfile?.plans.push({
            memCK: relationship.memeCk,
            selected: relationship.memeCk == selectedPlanId,
            patientFhirId: relationship.patientFHIRID,
          });
        }
      } else {
        const relatedPerson = relationship.relatedPersons[0];
        addAUOrPRToProfiles(
          profiles,
          relatedPerson,
          relationship,
          selectedUserId,
          selectedPlanId,
        );
      }
    });

    if (findMemberRoleInProfiles(profiles) == null) {
      addNonMemberToProfiles(profiles, pbe, selectedUserId);
    }

    return profiles;
  } catch (err) {
    logger.error('Compute User Profiles Error', err);
    throw err;
  }
};

/**
 * Helper Functions for Profile Computation
 */

/**
 * Finds existing member role in profiles array
 */
const findMemberRoleInProfiles = (profiles: UserProfile[]) => {
  return profiles.find((item) => item.type == UserRole.MEMBER);
};

/**
 * Adds non-member profile to profiles array
 */
const addNonMemberToProfiles = (
  profiles: UserProfile[],
  pbe: PBEData,
  selectedUserId: string | undefined,
) => {
  profiles.unshift({
    id: pbe.getPBEDetails[0].umpid,
    personFhirId: pbe.getPBEDetails[0].personFHIRID,
    firstName: pbe.getPBEDetails[0].firstName,
    lastName: pbe.getPBEDetails[0].lastName,
    dob: formatDateToLocale(new Date(pbe.getPBEDetails[0].dob)),
    type: UserRole.NON_MEM,
    selected: selectedUserId == pbe.getPBEDetails[0].umpid,
    plans: [],
  });
};

/**
 * Adds Authorized User or Personal Representative to profiles
 */
const addAUOrPRToProfiles = (
  profiles: UserProfile[],
  relatedPerson: RelatedPerson,
  relationship: RelationshipInfo,
  selectedUserId: string | undefined,
  selectedPlanId: string | undefined,
) => {
  profiles.push({
    id: relatedPerson.relatedPersonUMPID,
    personFhirId: relatedPerson.relatedPersonFHIRID,
    firstName: relatedPerson.relatedPersonFirstName,
    lastName: relatedPerson.relatedPersonLastName,
    dob: formatDateToLocale(new Date(relatedPerson.relatedPersonDob)),
    type:
      relationship.personRoleType == 'PR'
        ? UserRole.PERSONAL_REP
        : UserRole.AUTHORIZED_USER,
    selected: selectedUserId == relatedPerson.relatedPersonUMPID,
    plans: relationship.relatedPersons.map((relatedPerson) => ({
      memCK: relatedPerson.relatedPersonMemeCk,
      patientFhirId: relatedPerson.relatedPersonPatientFHIRID,
      selected: relatedPerson.relatedPersonMemeCk == selectedPlanId,
    })),
  });
};

/**
 * Adds member profile to profiles array
 */
const addMemberToProfiles = (
  profiles: UserProfile[],
  pbe: PBEData,
  selectedUserId: string | undefined,
  relationship: RelationshipInfo,
  selectedPlanId: string | undefined,
) => {
  profiles.push({
    id: pbe.getPBEDetails[0].umpid,
    personFhirId: pbe.getPBEDetails[0].personFHIRID,
    firstName: pbe.getPBEDetails[0].firstName,
    lastName: pbe.getPBEDetails[0].lastName,
    dob: formatDateToLocale(new Date(pbe.getPBEDetails[0].dob)),
    type: UserRole.MEMBER,
    selected: selectedUserId == pbe.getPBEDetails[0].umpid,
    plans: [
      {
        memCK: relationship.memeCk,
        selected: relationship.memeCk == selectedPlanId,
        patientFhirId: relationship.patientFHIRID,
      },
    ],
  });
};

/**
 * Type Guards and Validation
 */

/**
 * Checks if a user role is valid
 */
export const isValidUserRole = (role: string): role is UserRole => {
  return Object.values(UserRole).includes(role as UserRole);
};

/**
 * Checks if user has member access
 */
export const hasMemberAccess = (userRole: UserRole): boolean => {
  return [UserRole.MEMBER, UserRole.AUTHORIZED_USER, UserRole.PERSONAL_REP].includes(userRole);
};

/**
 * Gets user role priority for sorting/display purposes
 */
export const getUserRolePriority = (role: UserRole): number => {
  switch (role) {
    case UserRole.MEMBER:
      return 1;
    case UserRole.AUTHORIZED_USER:
      return 2;
    case UserRole.PERSONAL_REP:
      return 3;
    case UserRole.NON_MEM:
      return 4;
    default:
      return 5;
  }
}; 