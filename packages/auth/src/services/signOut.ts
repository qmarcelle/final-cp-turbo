'use server';

import axios from 'axios';
import { signOut as nextAuthSignOut } from 'next-auth/react';

/**
 * API base URL
 */
export const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

/**
 * Sign out the current user
 * This handler extends the next-auth signOut to also handle any custom API calls
 */
export async function callSignOut(): Promise<void> {
  try {
    // Call API to invalidate server-side session if needed
    await axios.post(`${API_URL}/auth/signout`);

    // Call next-auth signOut
    await nextAuthSignOut();

    return Promise.resolve();
  } catch (error) {
    console.error('Error during sign out:', error);
    return Promise.reject('Failed to sign out');
  }
}
