// Common acronyms that should remain uppercase
const COMMON_ACRONYMS = new Set(['FAQ', 'HSA', 'FSA', 'ID', 'SSN']);

/**
 * String Formatting Utilities
 */

/**
 * Capitalizes the first letter of each word in a string
 * Handles special cases for known acronyms
 */
export const capitalizeName = (name: string): string => {
  return name
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Converts a camelCase or kebab-case string to Title Case
 * Preserves known acronyms in uppercase
 */
export const toTitleCase = (str: string): string => {
  // Handle kebab-case
  const withoutHyphens = str.replace(/-/g, ' ');

  // Handle camelCase with special care for acronyms
  const withSpaces = withoutHyphens
    .replace(/([A-Z][a-z]+|[A-Z]{2,}(?=[A-Z][a-z]|\d|\W|$))/g, ' $1')
    .replace(/([a-z])([A-Z])/g, '$1 $2');

  // Split into words and process each
  const words = withSpaces.trim().split(/\s+/);

  return words
    .map((word) => {
      const upperWord = word.toUpperCase();
      if (COMMON_ACRONYMS.has(upperWord)) {
        return upperWord;
      }

      // Handle compound words with acronyms
      for (const acronym of COMMON_ACRONYMS) {
        const regex = new RegExp(`\\b${acronym}\\b`, 'i');
        if (regex.test(word)) {
          return word.replace(regex, acronym);
        }
      }

      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
};

/**
 * Capitalizes the first letter of a string
 */
export const capitalizeString = (val: string): string => {
  const stringToFormat = val.toLowerCase();
  return stringToFormat.charAt(0).toUpperCase() + stringToFormat.slice(1);
};

/**
 * Converts string to PascalCase with spaces
 */
export const toPascalCase = (value: string): string => {
  return value
    .split(/[\s]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Phone Number Formatting Utilities
 */

/**
 * Formats phone number to (XXX) XXX-XXXX format
 * Removes all non-numeric characters and formats consistently
 */
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/[^0-9]/g, '');
  const area = cleaned.substring(0, 3);
  const pre = cleaned.substring(3, 6);
  const tel = cleaned.substring(6, 10);

  if (area.length < 3) {
    return '(' + area;
  } else if (area.length === 3 && pre.length < 3) {
    return '(' + area + ') ' + pre;
  } else if (area.length === 3 && pre.length === 3) {
    return '(' + area + ') ' + pre + '-' + tel;
  }
  return cleaned;
};

/**
 * Alternative phone formatter (maintains backward compatibility)
 */
export const formatPhone = (phone: string | undefined): string => {
  if (phone && phone.length > 0) {
    const cleaned = phone.replace(/[^0-9]/g, '');
    if (cleaned.length >= 10) {
      return '(' + cleaned.substring(0, 3) + ') ' + 
             cleaned.substring(3, 6) + '-' + cleaned.substring(6, 10);
    }
  }
  return phone ?? '';
};

/**
 * Currency Formatting Utilities
 */

/**
 * Formats number as USD currency
 */
export const formatCurrency = (
  value: number | bigint | undefined,
): string | undefined => {
  if (!value && value !== 0) {
    return;
  }

  return Intl.NumberFormat('en-US', {
    currency: 'USD',
    currencyDisplay: 'symbol',
    currencySign: 'standard',
    style: 'currency',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    minimumIntegerDigits: 1,
  }).format(value);
};

/**
 * Zip Code Formatting Utilities
 */

/**
 * Formats zip code with optional +4 extension
 */
export const formatZipCode = (zipCode: string | undefined): string => {
  if (zipCode && zipCode.length > 5) {
    return zipCode.substring(0, 5) + '-' + zipCode.substring(5, zipCode.length);
  }
  return zipCode ?? '';
};

/**
 * Date Formatting Utilities
 */

/**
 * Returns current UNIX timestamp in seconds
 */
export const UNIXTimeSeconds = (): number => {
  return Math.floor(new Date().getTime() / 1000);
};

/**
 * Formats Date object with customizable options
 */
export const formatDateToGiven = (
  date?: Date,
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow' | undefined,
  day?: 'numeric' | '2-digit' | undefined,
  year?: 'numeric' | '2-digit' | undefined,
  hour?: 'numeric' | '2-digit' | undefined,
  minute?: 'numeric' | '2-digit' | undefined,
  second?: 'numeric' | '2-digit' | undefined,
  timeZoneName?:
    | 'long'
    | 'short' 
    | 'shortOffset'
    | 'longOffset'
    | 'shortGeneric'
    | 'longGeneric'
    | undefined,
) => {
  return (date ?? new Date()).toLocaleDateString('en-US', {
    day,
    month,
    year,
    hour,
    minute,
    second,
    timeZoneName,
  });
};

/**
 * Formats Date to MM/dd/yyyy format
 */
export const formatDateToLocale = (date: Date): string => {
  return formatDateToGiven(date, '2-digit', '2-digit', 'numeric');
};

/**
 * Formats Date to MM-dd-yyyy format
 */
export const formatDateToIntlLocale = (date: Date): string => {
  return formatDateToLocale(date).replace(/\//g, '-');
};

/**
 * Formats date string from one pattern to another using date-fns
 */
export const formatDateString = (
  date: string,
  inputPattern: string,
  outputPattern: string,
): string => {
  // Note: This requires date-fns dependency
  // const parsedDate = parse(date, inputPattern, new Date());
  // return format(parsedDate, outputPattern);
  throw new Error('formatDateString requires date-fns dependency');
};

/**
 * Gets date from two years ago formatted as MM-dd-yyyy
 */
export const getDateTwoYearsAgoFormatted = (): string => {
  const today = new Date();
  return formatDateToIntlLocale(
    new Date(today.getFullYear() - 2, today.getMonth(), today.getDate()),
  );
};

/**
 * Gets date from two years ago as YYYY-MM-DD string
 */
export const getDateTwoYearsAgo = (): string => {
  const today = new Date();
  today.setFullYear(today.getFullYear() - 2);

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

/**
 * Gets current date as YYYY-MM-DD string
 */
export const getCurrentDate = (): string => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

/**
 * Computes difference in days between two dates
 */
export const getDifferenceInDays = (date1: Date, date2: Date): number => {
  const diffInMs = +date1 - +date2;
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  return Math.floor(diffInMs / millisecondsPerDay);
};

/**
 * Formats date input with slashes (MM/DD/YYYY)
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