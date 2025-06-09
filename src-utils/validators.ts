import { z } from 'zod';

/**
 * Zod Validation Schemas
 */

// Phone number schema - validates 10-digit US phone numbers
export const phoneSchema = z
  .string()
  .transform((val) => val.replace(/\D/g, '')) // Remove non-digits
  .refine((val) => val.length === 10, {
    message: 'Phone number must be exactly 10 digits',
  })
  .refine((val) => /^[2-9]\d{2}[2-9]\d{6}$/.test(val), {
    message: 'Please enter a valid US phone number',
  });

// Email schema with custom validation
export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address')
  .max(40, 'Email must be 40 characters or less')
  .refine((email) => {
    // Additional validation can be added here
    return true;
  });

// BCBST domain email schema
export const bcbstEmailSchema = z
  .string()
  .email('Please enter a valid email address')
  .refine((email) => {
    const parts = email.split('@');
    return parts.length === 2 && parts[1].endsWith('bcbst.com');
  }, {
    message: 'Email must be from bcbst.com domain',
  });

// Password schema with complexity requirements
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .max(30, 'Password must be 30 characters or less')
  .refine((password) => /[a-z]/.test(password), {
    message: 'Password must contain at least one lowercase letter',
  })
  .refine((password) => /[A-Z]/.test(password), {
    message: 'Password must contain at least one uppercase letter',
  })
  .refine((password) => /\d/.test(password), {
    message: 'Password must contain at least one number',
  })
  .refine((password) => /[!@#$%^&*()\-=_+]/.test(password), {
    message: 'Password must contain at least one special character (!@#$%^&*()-=_+)',
  })
  .refine((password) => !/[\[\]{};':"\\|,.`<>\/?~]/.test(password), {
    message: 'Password cannot contain these characters: []{};\'"\\|,.`<>/?~',
  });

// Date schema for MM/DD/YYYY format
export const dateSchema = z
  .string()
  .refine((dateVal) => {
    if (dateVal.replace(/\//g, '').length <= 7) {
      return false;
    }
    
    // Parse the date parts
    const parts = dateVal.split('/');
    if (parts.length !== 3) return false;
    
    const month = parseInt(parts[0], 10);
    const day = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);
    
    // Create date object and validate
    const dateObj = new Date(year, month - 1, day);
    return (
      dateObj.getFullYear() === year &&
      dateObj.getMonth() === month - 1 &&
      dateObj.getDate() === day
    );
  }, {
    message: 'Please enter a valid date in MM/DD/YYYY format',
  });

// Zip code schema
export const zipCodeSchema = z
  .string()
  .refine((zipCode) => /^\d{5}(-\d{4})?$/.test(zipCode), {
    message: 'Please enter a valid zip code (12345 or 12345-6789)',
  });

// Confirm email schema (requires context)
export const createConfirmEmailSchema = (originalEmail: string) =>
  z
    .string()
    .email('Please enter a valid email address')
    .refine((value) => value === originalEmail, {
      message: 'Email addresses do not match',
    });

/**
 * Legacy Validation Functions (for backward compatibility)
 */

/**
 * Validates mobile number using Zod schema
 */
export const isValidMobileNumber = (mobileNumber: string): boolean => {
  const result = phoneSchema.safeParse(mobileNumber);
  return result.success;
};

/**
 * Validates email address using Zod schema
 */
export const isValidEmailAddress = (email: string): boolean => {
  if (!email || email.length === 0) return true; // Allow empty
  const result = emailSchema.safeParse(email);
  return result.success;
};

/**
 * Validates password using Zod schema
 */
export const isValidPassword = (password: string): boolean => {
  const result = passwordSchema.safeParse(password);
  return result.success;
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
 * Validates date format
 */
export const validateDate = (dateVal: string): boolean => {
  const result = dateSchema.safeParse(dateVal);
  return result.success;
};

/**
 * Validates BCBST domain email
 */
export const isValidEmailDomain = (email: string): boolean => {
  const result = bcbstEmailSchema.safeParse(email);
  return result.success;
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
  const result = zipCodeSchema.safeParse(zipCode);
  return result.success;
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

/**
 * Formats date input as user types (MM/DD/YYYY)
 */
export const formatDateInput = (value: string): string => {
  if (value.includes('/')) {
    const digits = value.split('/');
    if (digits.length === 2) {
      if (digits[1].length > 2) {
        value = digits[0] + '/' + digits[1].slice(0, 2) + '/' + digits[1].slice(2);
      }
    }
  } else {
    // Remove all non-digit characters
    value = value.replace(/\D/g, '');
    // Add slashes at appropriate positions
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    if (value.length > 5) {
      value = value.slice(0, 5) + '/' + value.slice(5);
    }
  }
  return value;
};

/**
 * Advanced Validation with Better Error Messages
 */

/**
 * Validates and returns detailed error information
 */
export const validateField = (
  value: string,
  schema: z.ZodSchema,
): { isValid: boolean; errors: string[] } => {
  const result = schema.safeParse(value);
  
  if (result.success) {
    return { isValid: true, errors: [] };
  }
  
  return {
    isValid: false,
    errors: result.error.errors.map((err) => err.message),
  };
};

/**
 * Validate multiple fields at once
 */
export const validateForm = (
  data: Record<string, any>,
  schema: z.ZodSchema,
): { isValid: boolean; errors: Record<string, string[]> } => {
  const result = schema.safeParse(data);
  
  if (result.success) {
    return { isValid: true, errors: {} };
  }
  
  const errors: Record<string, string[]> = {};
  result.error.errors.forEach((err) => {
    const field = err.path.join('.');
    if (!errors[field]) {
      errors[field] = [];
    }
    errors[field].push(err.message);
  });
  
  return { isValid: false, errors };
};

// Schemas are already exported above where they're declared 