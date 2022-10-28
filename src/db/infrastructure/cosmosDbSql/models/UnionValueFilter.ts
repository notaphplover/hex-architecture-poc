import { BaseMultipleValueFilter } from './BaseMultipleValueFilter';
import { ValueFilterKind } from './ValueFilterKind';

export type UnionValueFilter<TValue> = BaseMultipleValueFilter<
  ValueFilterKind.union,
  TValue
>;
