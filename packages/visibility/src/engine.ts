import { BaseEngine } from '@portals/visibility-core';
import { RulesConfig, RulesConfigSchema, RuleDef } from './rules.schema';
import { switchableEntitiesConfig, planSwitchServiceAdapter } from '@portals/auth/src';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import Jexl from 'jexl';
// import { fetchRulesFromSitecore } from '@portals/sitecore-integration/src/services'; // Correct path after sitecore-integration is scaffolded

// Placeholder for Sitecore fetch function until its package is scaffolded
async function fetchRulesFromSitecore(): Promise<string> {
  console.warn("fetchRulesFromSitecore is using a placeholder implementation.");
  // Simulate fetching YAML string, perhaps return a default minimal valid YAML
  return `rules:\n  fallbackFeature:\n    type: static\n    value: false`;
}

export class PolicyEngine extends BaseEngine<any, RulesConfig> {
  private jexl: Jexl.Jexl;

  private constructor(config: RulesConfig) {
    super(config);
    this.jexl = new Jexl.Jexl();
    // You can register custom Jexl transforms or functions here if needed
    // this.jexl.addTransform('upper', (val: string) => val.toUpperCase());
  }

  static async loadConfig(): Promise<PolicyEngine> {
    let rawConfig: unknown;
    const localRulesPath = path.resolve(process.cwd(), 'packages/visibility/config/rules.local.yaml');

    if (process.env.VISIBILITY_USE_SITECORE === 'true') {
      try {
        console.log("Attempting to fetch rules from Sitecore...");
        const sitecoreYaml = await fetchRulesFromSitecore();
        rawConfig = yaml.load(sitecoreYaml);
        console.log("Successfully loaded rules from Sitecore.");
      } catch (error) {
        console.warn(
          `Failed to fetch rules from Sitecore or load them: ${error}. Falling back to local rules: ${localRulesPath}`
        );
        if (fs.existsSync(localRulesPath)) {
          rawConfig = yaml.load(fs.readFileSync(localRulesPath, 'utf8'));
        } else {
          console.error(`Local rules file not found at ${localRulesPath}. No rules loaded.`);
          rawConfig = { rules: {} }; // Default to empty rules if Sitecore fails and local doesn't exist
        }
      }
    } else {
      console.log(`VISIBILITY_USE_SITECORE is not 'true', loading local rules from: ${localRulesPath}`);
      if (fs.existsSync(localRulesPath)) {
        rawConfig = yaml.load(fs.readFileSync(localRulesPath, 'utf8'));
      } else {
        console.error(`Local rules file not found at ${localRulesPath}. No rules loaded.`);
        rawConfig = { rules: {} }; // Default to empty rules if local doesn't exist
      }
    }

    try {
      const parsedConfig = RulesConfigSchema.parse(rawConfig);
      return new PolicyEngine(parsedConfig);
    } catch (error) {
      console.error("Failed to parse rules configuration:", error);
      // Fallback to a PolicyEngine with empty rules if parsing fails
      return new PolicyEngine({ rules: {} });
    }
  }

  async computeRules(userInfo: any, member: any): Promise<Record<string, boolean>> {
    let currentMember = member;
    // If user has switched plans in-session, update member data
    if (userInfo && userInfo.selectedPlan && switchableEntitiesConfig.plans.includes(userInfo.selectedPlan)) {
      try {
        console.log(`Plan switch detected for user ${userInfo.id} to plan ${userInfo.selectedPlan}. Fetching updated member data.`);
        currentMember = await planSwitchServiceAdapter.fetchMemberForPlan(userInfo.id, userInfo.selectedPlan);
      } catch (error) {
        console.error(`Error fetching member data for switched plan ${userInfo.selectedPlan}:`, error);
        // Decide on fallback behavior: use stale member data, or deny all, or specific error state?
        // For now, we proceed with potentially stale `member` data passed in if fetch fails.
      }
    }

    const context = { 
      userInfo, // Make sure userInfo is what you expect (e.g., includes roles, lob, authFunctions)
      member: currentMember, // Use potentially updated member data
      today: new Date(),
      // Add other contextual data sources if needed
    };
    const output: Record<string, boolean> = {};

    if (!this.config || !this.config.rules) {
      console.warn("PolicyEngine has no rules configured or config is undefined.");
      return {};
    }

    for (const [key, ruleDefUntyped] of Object.entries(this.config.rules)) {
      const ruleDef = ruleDefUntyped as RuleDef;
      try {
        switch (ruleDef.type) {
          case 'attribute':
            // Ensure path is a string and context is provided
            output[key] = ruleDef.path ? Boolean(await this.jexl.eval(ruleDef.path, context)) : false;
            break;
          case 'lob':
            output[key] = userInfo && userInfo.lob ? ruleDef.values.includes(userInfo.lob) : false;
            break;
          case 'policyType':
            output[key] = userInfo && userInfo.groupData && userInfo.groupData.policyType 
                            ? ruleDef.values.includes(userInfo.groupData.policyType) 
                            : false;
            break;
          case 'authFunction':
            // Ensure userInfo.authFunctions is an array of { functionName: string, available: boolean }
            if (userInfo && Array.isArray(userInfo.authFunctions)) {
              const authFuncMap = new Map(userInfo.authFunctions.map((fn: {functionName: string; available: boolean}) => [fn.functionName, fn.available]));
              output[key] = authFuncMap.get(ruleDef.name) || false;
            } else {
              output[key] = false;
            }
            break;
          case 'computed':
            output[key] = ruleDef.expr ? Boolean(await this.jexl.eval(ruleDef.expr, context)) : false;
            break;
          case 'static':
            output[key] = ruleDef.value;
            break;
          default:
            // This case should not be hit if RuleDef is a discriminated union and all types are handled
            // const _exhaustiveCheck: never = ruleDef; // Uncomment for exhaustive check
            console.warn(`Unknown rule type for rule '${key}'.`);
            output[key] = false;
        }
      } catch (evalError) {
        console.error(`Error evaluating rule '${key}' (type: ${ruleDef.type}):`, evalError);
        output[key] = false; // Default to false on error
      }
    }
    return output;
  }
} 