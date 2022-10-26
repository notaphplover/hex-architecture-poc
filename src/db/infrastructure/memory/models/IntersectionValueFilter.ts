import { BaseMultipleValueFilter } from './BaseMultipleValueFilter';
import { MultipleFilterKind } from './MultipleFilterKind';

export type IntersectionValueFilter<TValue> = BaseMultipleValueFilter<
  MultipleFilterKind.intersection,
  TValue
>;
