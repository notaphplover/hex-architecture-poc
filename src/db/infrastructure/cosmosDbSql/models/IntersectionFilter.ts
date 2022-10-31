import { BaseMultipleFilter } from './BaseMultipleFilter';
import { FilterKind } from './FilterKind';

export type IntersectionFilter<TValue> = BaseMultipleFilter<
  FilterKind.intersection,
  TValue
>;
