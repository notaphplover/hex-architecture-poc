export interface RuleValidator<TParams extends unknown[] = unknown[]> {
  isValid(...params: TParams): boolean;
}
