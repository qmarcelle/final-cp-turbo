import { z } from 'zod';

export const RuleDefSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('attribute'), path: z.string(), description: z.string().optional() }),
  z.object({ type: z.literal('lob'), values: z.string().array(), description: z.string().optional() }),
  z.object({ type: z.literal('policyType'), values: z.string().array(), description: z.string().optional() }),
  z.object({ type: z.literal('authFunction'), name: z.string(), description: z.string().optional() }),
  z.object({ type: z.literal('computed'), expr: z.string(), description: z.string().optional() }),
  z.object({ type: z.literal('static'), value: z.boolean(), description: z.string().optional() })
]);

export type RuleDef = z.infer<typeof RuleDefSchema>;

export const RulesConfigSchema = z.object({
  rules: z.record(RuleDefSchema) // Use RuleDefSchema here for parsing
});

export type RulesConfig = z.infer<typeof RulesConfigSchema>;

// Example Usage (for testing or understanding)
/*
const exampleConfig: RulesConfig = {
  rules: {
    canViewDashboard: { type: 'static', value: true },
    hasMedicalCoverage: { type: 'attribute', path: "member.coverageTypes.some(c => c.productType === 'M')" },
    isLoyaltyMember: { type: 'computed', expr: "userInfo.roles.includes('LOYA')" }
  }
};

try {
  RulesConfigSchema.parse(exampleConfig); // This should pass
  console.log("Example config is valid.");
} catch (e) {
  console.error("Example config validation error:", e);
}
*/ 