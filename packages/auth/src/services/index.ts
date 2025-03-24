// Export services using namespaces to avoid conflicts
import * as accountSelectionService from './accountSelection';
import * as authService from './auth';
import * as dxAuthService from './dxAuth';
import * as emailUniquenessService from './emailUniqueness';
import * as loginService from './login';
import * as mfaService from './mfa';
import * as pingOneService from './pingOne';
import * as resetPasswordService from './resetPassword';
import * as signOutService from './signOut';
import * as ssoService from './sso';
import * as verifyEmailService from './verifyEmail';

// Re-export as namespaces
export {
  accountSelectionService,
  authService,
  dxAuthService,
  emailUniquenessService,
  loginService,
  mfaService,
  pingOneService,
  resetPasswordService,
  signOutService,
  ssoService,
  verifyEmailService,
};
