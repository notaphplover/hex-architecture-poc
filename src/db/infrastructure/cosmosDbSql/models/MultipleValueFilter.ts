import { IntersectionValueFilter } from './IntersectionValueFilter';
import { InValueFilter } from './InValueFilter';
import { UnionValueFilter } from './UnionValueFilter';

export type MultipleValueFilter<TValue> =
  | InValueFilter<TValue>
  | IntersectionValueFilter<TValue>
  | UnionValueFilter<TValue>;
