import axios from 'axios';
import { getAuthToken } from '../utils/tokens';

/**
 * Base URL for API calls
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

/**
 * Interface for the account deactivation request
 */
export interface AccountDeactivationRequest {
  /**
   * The primary username to keep
   */
  primaryUserName: string;

  /**
   * The UMPI ID
   */
  umpiId: string;

  /**
   * The current username
   */
  userName: string;
}

/**
 * Interface for person business entity
 */
export interface PersonBusinessEntity {
  getPBEDetails: Array<{
    userName: string;
    umpid: string;
  }>;
}

/**
 * Get person business entity information
 * @param userId User ID to get PBE for
 * @returns Promise with PBE details
 */
export async function getPersonBusinessEntity(
  userId: string,
): Promise<PersonBusinessEntity> {
  try {
    const token = await getAuthToken();

    const response = await axios.get(
      `${API_BASE_URL}/personBusinessEntity/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching person business entity:', error);
    throw new Error('Failed to fetch person business entity');
  }
}

/**
 * Call account deactivation API
 * @param data Account deactivation request data
 * @returns Promise with deactivation result
 */
export async function callAccountDeactivation(
  data: AccountDeactivationRequest,
): Promise<boolean> {
  try {
    const token = await getAuthToken();

    const response = await axios.post(
      `${API_BASE_URL}/accountDeactivation`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.status === 200;
  } catch (error) {
    console.error('Error calling account deactivation:', error);
    throw new Error('Failed to deactivate accounts');
  }
}
