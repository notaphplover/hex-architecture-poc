import { BaseMultipleFilter } from './BaseMultipleFilter';
import { MultipleFilterKind } from './MultipleFilterKind';

export type UnionFilter<TValue> = BaseMultipleFilter<
  MultipleFilterKind.union,
  TValue
>;
