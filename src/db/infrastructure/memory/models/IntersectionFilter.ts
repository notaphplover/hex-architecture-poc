import { BaseMultipleFilter } from './BaseMultipleFilter';
import { MultipleFilterKind } from './MultipleFilterKind';

export type IntersectionFilter<TValue> = BaseMultipleFilter<
  MultipleFilterKind.intersection,
  TValue
>;
