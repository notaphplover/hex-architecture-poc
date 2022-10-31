import { Filter } from './Filter';
import { FilterKind } from './FilterKind';

export interface BaseMultipleFilter<TKind extends FilterKind, TValue> {
  filters: Filter<TValue>[];
  kind: TKind;
}
