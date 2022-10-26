import { IntersectionValueFilter } from './IntersectionValueFilter';
import { UnionValueFilter } from './UnionValueFilter';

export type MultipleValueFilter<TValue> =
  | IntersectionValueFilter<TValue>
  | UnionValueFilter<TValue>;
