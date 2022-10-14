export interface Builder<TParams extends unknown[], TModel> {
  build(...params: TParams): TModel;
}
