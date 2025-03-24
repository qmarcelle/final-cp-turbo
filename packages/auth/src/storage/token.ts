import { BaseAuthToken } from '../models/core';

export interface TokenStorageOptions {
  useLocalStorage?: boolean;
  storageKey?: string;
}

export class TokenStorage {
  private readonly storage: Storage;
  private readonly storageKey: string;

  constructor(options: TokenStorageOptions = {}) {
    const { useLocalStorage = true, storageKey = 'auth_token' } = options;
    this.storage = useLocalStorage ? localStorage : sessionStorage;
    this.storageKey = storageKey;
  }

  async setToken(token: BaseAuthToken): Promise<void> {
    this.storage.setItem(this.storageKey, JSON.stringify(token));
  }

  async getToken(): Promise<BaseAuthToken | null> {
    const tokenStr = this.storage.getItem(this.storageKey);
    return tokenStr ? JSON.parse(tokenStr) : null;
  }

  async removeToken(): Promise<void> {
    this.storage.removeItem(this.storageKey);
  }
}

export function createTokenStorage(
  options?: TokenStorageOptions,
): TokenStorage {
  return new TokenStorage(options);
}

export const tokenStorage = createTokenStorage();
