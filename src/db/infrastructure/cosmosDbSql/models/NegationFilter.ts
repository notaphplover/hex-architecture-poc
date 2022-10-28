import { Filter } from './Filter';
import { FilterKind } from './FilterKind';

export interface NegationFilter<TValue> {
  filter: Filter<TValue>;
  kind: FilterKind.negation;
}
