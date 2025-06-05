import { BaseEngine } from '@portals/visibility-core'
import { RulesConfig, RulesConfigSchema, RuleDef } from './rules.schema'
import type { SessionUser } from '@portals/auth'
import {
  switchableEntitiesConfig,
  planSwitchServiceAdapter,
} from '@portals/auth'
import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import jexl from 'jexl'
// import { fetchRulesFromSitecore } from '@portals/sitecore-integration/src/services'; // Correct path after sitecore-integration is scaffolded

// Helper function to safely evaluate Jexl expressions to a boolean
async function safeJexlEvalToBoolean(
  engine: InstanceType<typeof jexl.Jexl>,
  expression: string,
  context: any
): Promise<boolean> {
  try {
    const result = await engine.eval(expression, context)
    if (typeof result === 'boolean') {
      return result
    }
    return Boolean(result)
  } catch (evalError) {
    console.error(
      `Jexl evaluation error for expression '${expression}':`,
      evalError
    )
    return false
  }
}

// Placeholder for Sitecore fetch function until its package is scaffolded
async function fetchRulesFromSitecore(): Promise<string> {
  console.warn('fetchRulesFromSitecore is using a placeholder implementation.')
  return `rules:\n  fallbackFeature:\n    type: static\n    value: false`
}

// Define a type for the context used in computeRules
interface PolicyEvaluationContext {
  userInfo: SessionUser | any // Consider if 'any' can be narrowed
  member: any // Consider if 'any' can be narrowed
}

export class PolicyEngine extends BaseEngine<
  PolicyEvaluationContext,
  RulesConfig
> {
  private jexlEngine: InstanceType<typeof jexl.Jexl>

  private constructor(config: RulesConfig) {
    super(config)
    this.jexlEngine = new jexl.Jexl()
    // You can register custom Jexl transforms or functions here if needed
    // this.jexlEngine.addTransform('upper', (val: string) => val.toUpperCase());
  }

  static async loadConfig(): Promise<PolicyEngine> {
    let rawConfig: unknown
    const localRulesPath = path.resolve(
      process.cwd(),
      'packages/visibility/config/rules.local.yaml'
    )

    if (process.env.VISIBILITY_USE_SITECORE === 'true') {
      try {
        console.log('Attempting to fetch rules from Sitecore...')
        const sitecoreYaml = await fetchRulesFromSitecore()
        rawConfig = yaml.load(sitecoreYaml)
        console.log('Successfully loaded rules from Sitecore.')
      } catch (error) {
        console.warn(
          `Failed to fetch rules from Sitecore or load them: ${error}. Falling back to local rules: ${localRulesPath}`
        )
        if (fs.existsSync(localRulesPath)) {
          rawConfig = yaml.load(fs.readFileSync(localRulesPath, 'utf8'))
        } else {
          console.error(
            `Local rules file not found at ${localRulesPath}. No rules loaded.`
          )
          rawConfig = { rules: {} } // Default to empty rules if Sitecore fails and local doesn't exist
        }
      }
    } else {
      console.log(
        `VISIBILITY_USE_SITECORE is not 'true', loading local rules from: ${localRulesPath}`
      )
      if (fs.existsSync(localRulesPath)) {
        rawConfig = yaml.load(fs.readFileSync(localRulesPath, 'utf8'))
      } else {
        console.error(
          `Local rules file not found at ${localRulesPath}. No rules loaded.`
        )
        rawConfig = { rules: {} } // Default to empty rules if local doesn't exist
      }
    }

    try {
      const parsedConfig = RulesConfigSchema.parse(rawConfig)
      return new PolicyEngine(parsedConfig)
    } catch (error) {
      console.error('Failed to parse rules configuration:', error)
      // Fallback to a PolicyEngine with empty rules if parsing fails
      return new PolicyEngine({ rules: {} })
    }
  }

  async computeRules(
    ctx: PolicyEvaluationContext
  ): Promise<Record<string, boolean>> {
    let currentMember = ctx.member
    const userInfo = ctx.userInfo

    // If user has switched plans in-session, update member data
    if (
      userInfo &&
      userInfo.selectedPlan &&
      switchableEntitiesConfig.plans.includes(userInfo.selectedPlan)
    ) {
      try {
        console.log(
          `Plan switch detected for user ${userInfo.id} to plan ${userInfo.selectedPlan}. Fetching updated member data.`
        )
        currentMember = await planSwitchServiceAdapter.fetchMemberForPlan(
          userInfo.id,
          userInfo.selectedPlan
        )
      } catch (error) {
        console.error(
          `Error fetching member data for switched plan ${userInfo.selectedPlan}:`,
          error
        )
        // Should currentMember be reset or error propagated further?
      }
    }

    // Define a type for evaluationContext for clarity and stricter typing
    interface JexlEvaluationContext {
      userInfo: SessionUser | any // Match PolicyEvaluationContext or be more specific
      member: any // Match PolicyEvaluationContext or be more specific
      today: Date
    }

    const evaluationContext: JexlEvaluationContext = {
      userInfo,
      member: currentMember,
      today: new Date(),
    }
    const output: Record<string, boolean> = {}

    if (!this.config || !this.config.rules) {
      console.warn(
        'PolicyEngine has no rules configured or config is undefined.'
      )
      return {} // Revert to simple empty object
    }

    for (const [key, ruleDefUntyped] of Object.entries(this.config.rules)) {
      const ruleDef = ruleDefUntyped as RuleDef
      try {
        switch (ruleDef.type) {
          case 'attribute':
            output[key] = ruleDef.path
              ? await safeJexlEvalToBoolean(
                  this.jexlEngine,
                  ruleDef.path,
                  evaluationContext
                )
              : false
            break
          case 'lob':
            output[key] =
              userInfo && userInfo.lob
                ? ruleDef.values.includes(userInfo.lob)
                : false
            break
          case 'policyType':
            output[key] =
              userInfo && userInfo.groupData && userInfo.groupData.policyType
                ? ruleDef.values.includes(userInfo.groupData.policyType)
                : false
            break
          case 'authFunction':
            let isAuthorized: boolean = false
            if (userInfo && Array.isArray(userInfo.authFunctions)) {
              // Explicitly type the map to ensure it stores booleans
              const authFuncMap: Map<string, boolean> = new Map(
                userInfo.authFunctions.map(
                  (fn: { functionName: string; available: unknown }) => [
                    fn.functionName,
                    Boolean(fn.available), // Ensure the stored value is a boolean
                  ]
                )
              )
              const mapValue = authFuncMap.get(ruleDef.name)
              if (typeof mapValue === 'boolean') {
                isAuthorized = mapValue
              }
            }
            output[key] = isAuthorized
            break
          case 'computed':
            output[key] = ruleDef.expr
              ? await safeJexlEvalToBoolean(
                  this.jexlEngine,
                  ruleDef.expr,
                  evaluationContext
                )
              : false
            break
          case 'static':
            output[key] = ruleDef.value
            break
          default:
            // This case should not be hit if RuleDef is a discriminated union and all types are handled
            // const _exhaustiveCheck: never = ruleDef; // Uncomment for exhaustive check
            console.warn(`Unknown rule type for rule '${key}'.`)
            output[key] = false
        }
      } catch (evalError) {
        console.error(
          `Error evaluating rule '${key}' (type: ${ruleDef.type}):`,
          evalError
        )
        output[key] = false // Default to false on error
      }
    }
    return output
  }
}
