import { IntersectionFilter } from './IntersectionFilter';
import { NegationFilter } from './NegationFilter';
import { UnionFilter } from './UnionFilter';

export type MultipleFilter<TValue> =
  | IntersectionFilter<TValue>
  | NegationFilter<TValue>
  | UnionFilter<TValue>;
