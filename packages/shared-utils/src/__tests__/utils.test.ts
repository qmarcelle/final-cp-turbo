import { get, formatCurrency, isEmpty, generateUUID, debounce } from '../index';

describe('Utils', () => {
  describe('get', () => {
    const testObj = {
      user: {
        profile: {
          name: 'John Doe',
          age: 30,
        },
        settings: {
          theme: 'dark',
        },
      },
      posts: [
        { id: 1, title: 'First Post' },
        { id: 2, title: 'Second Post' },
      ],
    };

    it('should get a nested property value', () => {
      expect(get(testObj, 'user.profile.name')).toBe('John Doe');
      expect(get(testObj, 'user.settings.theme')).toBe('dark');
    });

    it('should return undefined for non-existent paths', () => {
      expect(get(testObj, 'user.profile.address')).toBeUndefined();
    });

    it('should return the default value for non-existent paths', () => {
      expect(get(testObj, 'user.profile.address', 'N/A')).toBe('N/A');
    });
  });

  describe('formatCurrency', () => {
    it('should format numbers as USD currency by default', () => {
      expect(formatCurrency(1000)).toBe('$1,000.00');
      expect(formatCurrency(1234.56)).toBe('$1,234.56');
    });

    it('should format numbers with different currency and locale', () => {
      expect(formatCurrency(1000, 'de-DE', 'EUR')).toMatch(/1.000,00\s€|€\s1.000,00/);
    });
  });

  describe('isEmpty', () => {
    it('should return true for null and undefined values', () => {
      expect(isEmpty(null)).toBe(true);
      expect(isEmpty(undefined)).toBe(true);
    });

    it('should return true for empty strings', () => {
      expect(isEmpty('')).toBe(true);
      expect(isEmpty('   ')).toBe(true);
    });

    it('should return true for empty arrays', () => {
      expect(isEmpty([])).toBe(true);
    });

    it('should return true for empty objects', () => {
      expect(isEmpty({})).toBe(true);
    });

    it('should return false for non-empty values', () => {
      expect(isEmpty('hello')).toBe(false);
      expect(isEmpty(0)).toBe(false);
      expect(isEmpty([1, 2, 3])).toBe(false);
      expect(isEmpty({ key: 'value' })).toBe(false);
    });
  });

  describe('generateUUID', () => {
    it('should generate a valid UUID string', () => {
      const uuid = generateUUID();
      expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
    });

    it('should generate unique UUIDs', () => {
      const uuid1 = generateUUID();
      const uuid2 = generateUUID();
      expect(uuid1).not.toBe(uuid2);
    });
  });

  describe('debounce', () => {
    jest.useFakeTimers();

    it('should debounce function calls', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn();
      expect(mockFn).not.toHaveBeenCalled();

      debouncedFn();
      debouncedFn();
      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });
});
