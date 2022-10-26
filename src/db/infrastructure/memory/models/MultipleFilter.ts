import { IntersectionFilter } from './IntersectionFilter';
import { UnionFilter } from './UnionFilter';

export type MultipleFilter<TValue> =
  | IntersectionFilter<TValue>
  | UnionFilter<TValue>;
