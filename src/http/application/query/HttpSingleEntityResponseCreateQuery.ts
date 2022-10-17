export interface HttpSingleEntityResponseCreateQuery<
  TParams,
  TModel,
  TModelApi,
> {
  readonly handlerParams: TParams;
  readonly model: TModel | undefined;
  readonly modelApi: TModelApi | undefined;
}
