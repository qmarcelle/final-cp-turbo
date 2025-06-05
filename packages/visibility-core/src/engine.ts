export class BaseEngine<Ctx = any, Config = any> {
  constructor(protected config: Config) {}

  // Changed to be async to match the derived class in @portals/visibility
  async computeRules(ctx: Ctx): Promise<Record<string, boolean>> {
    console.log(
      'BaseEngine.computeRules called with context:',
      ctx,
      'and config:',
      this.config
    )
    // Base implementation might throw, or return empty/default rules.
    // Derived classes are expected to provide the actual logic.
    throw new Error(
      'Not implemented: BaseEngine.computeRules must be overridden in derived classes'
    )
    // return {}; // Or return an empty object if that's a valid default
  }
}
