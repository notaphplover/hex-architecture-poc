export interface HttpSingleEntityResponseCreateQuery<
  TParams,
  TModel,
  TModelApi,
> {
  readonly useCaseParams: TParams;
  readonly model: TModel | undefined;
  readonly modelApi: TModelApi | undefined;
}
