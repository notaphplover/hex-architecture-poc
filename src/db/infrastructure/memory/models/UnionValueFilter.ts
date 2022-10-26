import { BaseMultipleValueFilter } from './BaseMultipleValueFilter';
import { MultipleFilterKind } from './MultipleFilterKind';

export type UnionValueFilter<TValue> = BaseMultipleValueFilter<
  MultipleFilterKind.union,
  TValue
>;
