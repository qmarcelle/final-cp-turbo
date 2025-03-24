# Previous Authentication Flow Test Cases

This document outlines the test cases from the previous authentication flow implementation. These test cases serve as a reference for implementing similar functionality in the new auth package.

## Login Flow Tests

### Password Reset Flow

Located in `src/tests/app/login/error_handling/reset_password_errors.spec.tsx`

1. **Forced Password Reset**

   - Test: User attempts to use one of their previous 10 passwords
   - Expected: Error message shown indicating password can't be same as last 10 passwords
   - API Endpoint: `/mfAuthentication/loginAuthentication/passwordReset`
   - Error Code: `FPR-400-1`

2. **Common Password Validation**
   - Test: User attempts to use a commonly used password
   - Expected: Error message shown for commonly used passwords
   - API Endpoint: `/mfAuthentication/loginAuthentication/passwordReset`
   - Error Code: `FPR-400-2`

### Authentication API Integration

- Base URL: `/mfAuthentication/loginAuthentication`
- Required Parameters:
  ```typescript
  {
    appId: string;
    ipAddress: string;
    password: string;
    policyId: string;
    userAgent: string;
    username: string;
    deviceProfile: string;
  }
  ```

## Session Management Tests

### User Role and Plan Status

Located in `src/tests/user_management/member_with_PR_role/member_selected_with_termed_plan/SiteHeaderViewTermedPlan.spec.tsx`

1. **Termed Plan Access**
   - Test: User with termed plan should see limited features
   - Visible Elements: Inbox
   - Hidden Elements: ID Card, My Health
   - User Profile Structure:
   ```typescript
   interface UserProfile {
     dob: string;
     firstName: string;
     lastName: string;
     id: string;
     personFhirId: string;
     selected: boolean;
     type: UserRole;
     plans: Array<{
       memCK: string;
       patientFhirId: string;
       selected: boolean;
     }>;
   }
   ```

## Authorization Function Tests

Located in `src/tests/visibilityEngine/computeAuthFunctions.spec.ts`

1. **Feature Visibility Rules**

   - Test: Compute visibility rules based on auth functions
   - Auth Functions Tested:
     - CLAIMSHOLD
     - KB_NO_BENEFITS
     - MYPCPELIGIBLE
     - IDPROTECTELIGIBLE
     - OTCEnable
     - ENABLE_PHAR_TAB
     - BLUEPRKS
     - TELADOC_DIABETESMGMT

2. **Auth Function Error Handling**
   - Test: Handle missing auth functions gracefully
   - Expected: All visibility rules default to false when auth functions are empty

## Implementation Notes

1. **Environment Configuration**

   - Required environment variables:
     ```
     ENCRYPTION_SECRET
     ES_API_POLICY_ID
     ES_API_APP_ID
     ```

2. **Error Handling**

   - Use specific error codes for different scenarios
   - Implement user-friendly error messages
   - Handle edge cases like missing auth functions

3. **Security Considerations**

   - Implement password history validation
   - Check for common/weak passwords
   - Validate date of birth during password reset

4. **UI/UX Requirements**
   - Show loading indicators during authentication
   - Clear error messages for validation failures
   - Proper feature visibility based on user role and plan status

## Migration Recommendations

1. **Auth Flow**

   - Maintain similar password reset validation logic
   - Keep the same error code structure
   - Preserve the authentication parameter requirements

2. **Session Management**

   - Implement role-based access control
   - Maintain plan status checks
   - Keep feature visibility rules

3. **Testing Strategy**
   - Port critical test cases to new implementation
   - Maintain same level of coverage
   - Keep similar test organization structure
