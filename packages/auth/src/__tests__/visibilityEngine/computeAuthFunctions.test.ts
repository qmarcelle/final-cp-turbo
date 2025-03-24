import { computeAuthFunctions } from '../../visibilityEngine/computeAuthFunctions';
import {
  BaseVisibilityRules,
  ComputedVisibilityRules,
} from '../../visibilityEngine/rules';

describe('computeAuthFunctions', () => {
  it('should correctly compute basic visibility rules', () => {
    const authFunctions = [
      { functionName: 'ACTIVE', available: true },
      { functionName: 'TERMED', available: false },
      { functionName: 'COMMERCIAL', available: true },
    ];

    const rules: ComputedVisibilityRules = {
      active: false,
      termed: false,
      commercial: false,
    };

    computeAuthFunctions(authFunctions, rules);

    expect(rules.active).toBe(true);
    expect(rules.termed).toBe(false);
    expect(rules.commercial).toBe(true);
  });

  it('should handle missing auth functions gracefully', () => {
    const authFunctions: any[] = [];
    const rules: ComputedVisibilityRules = {
      active: false,
      termed: false,
      commercial: false,
    };

    computeAuthFunctions(authFunctions, rules);

    expect(rules.active).toBe(false);
    expect(rules.termed).toBe(false);
    expect(rules.commercial).toBe(false);
  });

  it('should handle undefined auth functions', () => {
    const authFunctions = undefined;
    const rules: ComputedVisibilityRules = {
      active: false,
      termed: false,
      commercial: false,
    };

    computeAuthFunctions(authFunctions, rules);

    expect(rules.active).toBe(false);
    expect(rules.termed).toBe(false);
    expect(rules.commercial).toBe(false);
  });

  it('should allow extending base visibility rules', () => {
    const authFunctions = [
      { functionName: 'ACTIVE', available: true },
      { functionName: 'CUSTOM_RULE', available: true },
    ];

    const rules: BaseVisibilityRules = {
      active: false,
      customRule: false,
    };

    computeAuthFunctions(authFunctions, rules);

    expect(rules.active).toBe(true);
    expect(rules.customRule).toBe(true);
  });
});
