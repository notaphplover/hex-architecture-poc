import { BaseMultipleValueFilter } from './BaseMultipleValueFilter';
import { ValueFilterKind } from './ValueFilterKind';

export type IntersectionValueFilter<TValue> = BaseMultipleValueFilter<
  ValueFilterKind.intersection,
  TValue
>;
