import { z } from 'zod';

// Helper to convert keys from camelCase to snake_case
function toSnakeCase(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

function transformKeysAndValues(obj: any, keyTransformFn: (key: string) => string, valueTransformFn: (key: string, value: any) => any): any {
  if (Array.isArray(obj)) {
    return obj.map(item => transformKeysAndValues(item, keyTransformFn, valueTransformFn));
  }
  if (obj !== null && typeof obj === 'object' && !(obj instanceof Date)) {
    return Object.keys(obj).reduce((acc, key) => {
      const transformedKey = keyTransformFn(key);
      acc[transformedKey] = transformKeysAndValues(obj[key], keyTransformFn, valueTransformFn);
      // Apply value transformation at the parent level after children are processed
      // This simple version applies it to the current value directly, which is usually what's needed for Dates.
      acc[transformedKey] = valueTransformFn(transformedKey, acc[transformedKey]);
      return acc;
    }, {} as any);
  }
  // If it's a primitive or Date, apply value transformation directly
  // For the RequestTransformer, this means dates are stringified at the leaf.
  return valueTransformFn("", obj); // Pass empty key for root primitives/dates
}

export class RequestTransformer {
  /**
   * Transforms request object keys to snake_case and stringifies Date objects to ISO format.
   * Also validates the request data against a Zod schema if provided.
   */
  static transform<T extends z.ZodTypeAny>(data: any, schema?: T): any {
    if (data === null || data === undefined) return data;

    // 1. Validate initial data if schema is provided
    if (schema) {
      const validationResult = schema.safeParse(data);
      if (!validationResult.success) {
        const errorMessages = validationResult.error.errors.map(e => `${e.path.join('.')} ${e.message}`).join(', ');
        console.error('RequestTransformer: Zod validation failed before transformation. Errors:', validationResult.error.flatten());
        throw new Error(`Request data validation failed: ${errorMessages}`);
      }
      // Use validated data for transformation to ensure it matches schema expectations before keys/values are changed
      data = validationResult.data;
    }

    // 2. Transform keys to snake_case and Date objects to ISO strings
    const transformedData = transformKeysAndValues(
      data,
      toSnakeCase,
      (_key, value) => {
        if (value instanceof Date) {
          return value.toISOString();
        }
        return value;
      }
    );

    return transformedData;
  }
}
