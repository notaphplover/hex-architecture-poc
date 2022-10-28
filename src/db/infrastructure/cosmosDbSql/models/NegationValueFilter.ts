import { ValueFilter } from './ValueFilter';
import { ValueFilterKind } from './ValueFilterKind';

export interface NegationValueFilter<TValue> {
  filter: ValueFilter<TValue>;
  kind: ValueFilterKind.negation;
}
