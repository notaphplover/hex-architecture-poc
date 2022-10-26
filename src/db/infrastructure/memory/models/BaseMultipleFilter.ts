import { Filter } from './Filter';
import { MultipleFilterKind } from './MultipleFilterKind';

export interface BaseMultipleFilter<TKind extends MultipleFilterKind, TValue> {
  filters: Filter<TValue>[];
  kind: TKind;
}
