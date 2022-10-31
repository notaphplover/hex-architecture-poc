import { BaseMultipleFilter } from './BaseMultipleFilter';
import { FilterKind } from './FilterKind';

export type UnionFilter<TValue> = BaseMultipleFilter<FilterKind.union, TValue>;
