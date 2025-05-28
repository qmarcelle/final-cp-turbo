import { z } from 'zod';

// Helper to convert keys from snake_case to camelCase
function toCamelCase(str: string): string {
  return str.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace('-', '').replace('_', '');
  });
}

// Helper to convert keys from camelCase to snake_case
function toSnakeCase(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

function transformKeys(obj: any, transformFn: (key: string) => string): any {
  if (Array.isArray(obj)) {
    return obj.map(item => transformKeys(item, transformFn));
  }
  if (obj !== null && typeof obj === 'object' && !(obj instanceof Date)) {
    return Object.keys(obj).reduce((acc, key) => {
      acc[transformFn(key)] = transformKeys(obj[key], transformFn);
      return acc;
    }, {} as any);
  }
  return obj;
}

export class RequestTransformer {
  /**
   * Transforms request object keys to snake_case and stringifies Date objects to ISO format.
   */
  static transform(data: any): any {
    if (data === null || data === undefined) return data;

    let transformedData = JSON.parse(JSON.stringify(data, (_key, value) => {
      if (value instanceof Date) {
        return value.toISOString();
      }
      return value;
    }));

    return transformKeys(transformedData, toSnakeCase);
  }
}

export class ResponseTransformer {
  /**
   * Transforms response object keys to camelCase and parses ISO date strings to Date objects.
   * It uses a Zod schema to guide the date transformation selectively.
   */
  static transform<T extends z.ZodTypeAny>(data: any, schema?: T): z.infer<T> {
    if (data === null || data === undefined) return data;

    const camelCasedData = transformKeys(data, toCamelCase);

    // If no schema is provided, or schema parsing is not needed for dates, return early.
    if (!schema) {
      return camelCasedData;
    }

    // This is a simplified date parsing. For complex nested schemas,
    // a more sophisticated traversal synchronized with Zod schema definition might be needed.
    // Zod's .transform() or .preprocess() on specific fields is usually the best way to handle this.
    // This generic transformer provides a basic attempt.

    function parseDates(obj: any, currentSchemaDef: any): any {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }

        if (Array.isArray(obj)) {
            const itemSchemaDef = currentSchemaDef?.element;
            return obj.map(item => parseDates(item, itemSchemaDef));
        }

        const newObj: { [key: string]: any } = {};
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                const value = obj[key];
                const fieldSchemaDef = currentSchemaDef?.shape?.[key];

                if (typeof value === 'string' && (fieldSchemaDef?._def?.typeName === z.ZodFirstPartyTypeKind.ZodDate || fieldSchemaDef?._def?.typeName === z.ZodFirstPartyTypeKind.ZodOptional && fieldSchemaDef._def.innerType._def.typeName === z.ZodFirstPartyTypeKind.ZodDate)) {
                    const date = new Date(value);
                    // Check if date is valid. ISO string for invalid date might be 'Invalid Date' or similar
                    if (!isNaN(date.getTime())) {
                        newObj[key] = date;
                    } else {
                        newObj[key] = value; // Keep original string if parsing failed
                    }
                } else if (typeof value === 'object') {
                    newObj[key] = parseDates(value, fieldSchemaDef);
                } else {
                    newObj[key] = value;
                }
            }
        }
        return newObj;
    }

    // Apply date parsing based on schema structure
    const dataWithParsedDates = parseDates(camelCasedData, schema._def);

    // Final validation with the schema to ensure type safety and apply any schema-defined transformations
    const validation = schema.safeParse(dataWithParsedDates);
    if (validation.success) {
      return validation.data;
    } else {
      console.warn('ResponseTransformer: Zod validation failed after transformations. Errors:', validation.error.flatten());
      // Decide if you want to throw or return the unvalidated (but transformed) data
      // For robustness, you might return camelCasedData or throw validation.error
      return camelCasedData; // Or throw error
    }
  }
}
