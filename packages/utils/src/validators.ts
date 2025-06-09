// Note: This file requires zod as a dependency
// import { z } from 'zod';

/**
 * Legacy Validation Functions (backwards compatible)
 */

/**
 * Validates mobile number using regex
 */
export const isValidMobileNumber = (mobileNumber: string): boolean => {
  const phoneRegex = /^\d{3}\d{3}\d{4}$/;
  const digits = mobileNumber.replace(/\D/g, '');
  return phoneRegex.test(digits);
};

/**
 * Validates email address using regex
 */
export const isValidEmailAddress = (email: string): boolean => {
  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  let validEmail = isValidEmail.test(email);
  if (validEmail == false && (!email || email.length === 0)) {
    validEmail = true;
  }
  return validEmail;
};

/**
 * Validates password complexity
 */
export const isValidPassword = (password: string): boolean => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[!@#$%^&*()\-=_+])(?!.*[\[\]{};':"\\|,.`<>\/?~]).{8,30}$/g;
  return passwordRegex.test(password);
};

/**
 * Checks for disallowed special characters in password
 */
export const isSpecialCharactersAvailable = (password: string): boolean => {
  const passwordRegex = /.*[\[\]{};':"\\|,.`<>\/?~].*/;
  return passwordRegex.test(password);
};

/**
 * Validates string length
 */
export const validateLength = (value: string): boolean => {
  return value.length <= 40;
};

/**
 * Validates date format MM/DD/YYYY
 */
export const validateDate = (dateVal: string): boolean => {
  if (dateVal.replace(/\//g, '').length <= 7) {
    return false;
  }
  
  const parts = dateVal.split('/');
  if (parts.length !== 3) return false;
  
  const month = parseInt(parts[0], 10);
  const day = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);
  
  const dateObj = new Date(year, month - 1, day);
  return (
    dateObj.getFullYear() === year &&
    dateObj.getMonth() === month - 1 &&
    dateObj.getDate() === day
  );
};

/**
 * Validates BCBST domain email
 */
export const isValidEmailDomain = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return false;
  }
  const parts = email.split('@');
  return parts.length === 2 && parts[1].endsWith('bcbst.com');
};

/**
 * Checks if confirm email matches original
 */
export const isConfirmEmailAddressMatch = (value: string, email: string): boolean => {
  return value === email;
};

/**
 * Validates zip code
 */
export const isValidZipCode = (zipCode: string): boolean => {
  return /^\d{5}(-\d{4})?$/.test(zipCode);
};

/**
 * Masking Functions
 */

/**
 * Masks phone number showing only last 4 digits
 * Example: 9866545932 → (***)***-5932
 */
export const maskPhoneNumber = (phone: string): string =>
  `(***)***-${phone.substring(phone.length - 4)}`;

/**
 * Masks email address showing only first character and domain
 * Example: john@example.com → j***@example.com
 */
export const maskEmail = (email: string): string => {
  const [user, domain] = email.split('@');
  return `${user[0]}${'*'.repeat(user.length - 1)}@${domain}`;
};

/**
 * Formatting Functions for Input Fields
 */

/**
 * Formats phone number input as user types
 * Automatically adds (XXX) XXX-XXXX formatting
 */
export const formatPhoneInput = (phone: string): string => {
  const cleaned = phone.replace(/[^0-9]/g, '');
  const area = cleaned.substring(0, 3);
  const pre = cleaned.substring(3, 6);
  const tel = cleaned.substring(6, 10);
  
  let value = '';
  if (area.length < 3) {
    value = '(' + area;
  } else if (area.length === 3 && pre.length < 3) {
    value = '(' + area + ')' + ' ' + pre;
  } else if (area.length === 3 && pre.length === 3) {
    value = '(' + area + ')' + ' ' + pre + '-' + tel;
  }
  return value;
};

 