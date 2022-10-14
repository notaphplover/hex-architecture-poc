export interface Handler<TParams, TOutput> {
  handle(params: TParams): Promise<TOutput>;
}
