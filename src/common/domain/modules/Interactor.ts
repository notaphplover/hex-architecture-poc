export interface Interactor<TQuery, TOutput> {
  interact(query: TQuery): Promise<TOutput>;
}
