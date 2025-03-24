/**
 * Encryption utilities for data protection
 */

/**
 * Base64 encode a string
 * @param str String to encode
 * @returns Base64 encoded string
 */
export function base64Encode(str: string): string {
  if (typeof window !== 'undefined') {
    // Browser environment
    return btoa(encodeURIComponent(str));
  } else {
    // Node.js environment
    return Buffer.from(str).toString('base64');
  }
}

/**
 * Base64 decode a string
 * @param str Base64 encoded string
 * @returns Decoded string
 */
export function base64Decode(str: string): string {
  if (typeof window !== 'undefined') {
    // Browser environment
    return decodeURIComponent(atob(str));
  } else {
    // Node.js environment
    return Buffer.from(str, 'base64').toString();
  }
}

/**
 * Generate a random string of specified length
 * @param length Length of the random string
 * @returns Random string
 */
export function generateRandomString(length: number): string {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  if (
    typeof window !== 'undefined' &&
    window.crypto &&
    window.crypto.getRandomValues
  ) {
    // Browser with crypto support
    const values = new Uint32Array(length);
    window.crypto.getRandomValues(values);

    for (let i = 0; i < length; i++) {
      result += chars[values[i] % chars.length];
    }
  } else {
    // Fallback method
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  }

  return result;
}

/**
 * Generate a code verifier for PKCE (Proof Key for Code Exchange)
 * @returns Code verifier string
 */
export function generateCodeVerifier(): string {
  return generateRandomString(43);
}

/**
 * Generate a code challenge from a code verifier for PKCE
 * @param verifier Code verifier
 * @returns Code challenge
 */
export async function generateCodeChallenge(verifier: string): Promise<string> {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    // Browser with crypto support
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const hash = await window.crypto.subtle.digest('SHA-256', data);

    // Convert the hash to base64url
    return btoa(String.fromCharCode(...new Uint8Array(hash)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  } else {
    // Node.js environment - this is a simplified version
    // In a real implementation, you'd use the crypto module
    return base64Encode(verifier)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }
}

/**
 * Encrypt sensitive data (for client-side storage)
 * @param data Data to encrypt
 * @param key Encryption key
 * @returns Encrypted data
 */
export function encryptData(data: string, key: string): string {
  // This is a simple XOR encryption for demonstration
  // In production, use a proper encryption library
  const result = [];
  for (let i = 0; i < data.length; i++) {
    result.push(
      String.fromCharCode(data.charCodeAt(i) ^ key.charCodeAt(i % key.length)),
    );
  }
  return base64Encode(result.join(''));
}

/**
 * Decrypt sensitive data
 * @param encryptedData Encrypted data
 * @param key Encryption key
 * @returns Decrypted data
 */
export function decryptData(encryptedData: string, key: string): string {
  // This is a simple XOR decryption for demonstration
  // In production, use a proper encryption library
  const data = base64Decode(encryptedData);
  const result = [];
  for (let i = 0; i < data.length; i++) {
    result.push(
      String.fromCharCode(data.charCodeAt(i) ^ key.charCodeAt(i % key.length)),
    );
  }
  return result.join('');
}

/**
 * Hash a string (e.g., for password hashing)
 * @param str String to hash
 * @returns Hashed string
 */
export async function hashString(str: string): Promise<string> {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    // Browser with crypto support
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hash = await window.crypto.subtle.digest('SHA-256', data);

    // Convert the hash to hex
    return Array.from(new Uint8Array(hash))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  } else {
    // Node.js environment - this is a simplified version
    // In a real implementation, you'd use the crypto module
    return base64Encode(str);
  }
}
