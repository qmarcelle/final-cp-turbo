import axios from 'axios';

/**
 * Interface for OAuth token response
 */
interface OAuthToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at?: number;
}

/**
 * Global token storage
 */
declare global {
  // eslint-disable-next-line no-var
  var accessToken: OAuthToken | undefined;
}

/**
 * Get the authentication token, refreshing if needed
 * @returns The access token
 */
export async function getAuthToken(): Promise<string | undefined> {
  let token: undefined | string;
  const retry = 1;

  try {
    // Check if token exists and is not expired
    token = globalThis?.accessToken?.access_token;
    const expires = globalThis?.accessToken?.expires_at;
    const currentTime = new Date().getTime() / 1000;

    // If token is not available or has expired, get a new one
    if (!token || (token && expires && currentTime >= expires)) {
      token = await fetchToken(retry);
    }
  } catch (error) {
    console.error('Auth Token API - Failure', error);
  }

  return token;
}

/**
 * Fetch a new token from the auth server
 * @param retry Number of retry attempts
 * @returns The access token
 */
async function fetchToken(retry: number): Promise<string | undefined> {
  // This will be implemented to fetch a token from your auth server
  // Placeholder implementation
  try {
    const response = await axios.post('/api/auth/token');
    const token = response.data as OAuthToken;

    // Calculate expiry time
    if (token.expires_in) {
      token.expires_at = new Date().getTime() / 1000 + token.expires_in;
    }

    // Store token globally
    globalThis.accessToken = token;

    return token.access_token;
  } catch (error) {
    console.error('Error fetching token:', error);

    // Retry logic
    if (retry > 0) {
      return fetchToken(retry - 1);
    }

    return undefined;
  }
}
