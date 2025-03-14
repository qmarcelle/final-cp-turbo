/**
 * Authentication-related routes
 */
import { createRoute } from '../utils/createRoute';

export const authRoutes = {
  login: createRoute('/login'),
  register: createRoute('/register'),
  forgotPassword: createRoute('/forgot-password'),
  resetPassword: createRoute('/reset-password/:token'),
  ssoLanding: createRoute('/sso-landing'),
  logout: createRoute('/logout'),
}; 