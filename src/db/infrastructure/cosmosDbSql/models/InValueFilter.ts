import { ValueFilterKind } from './ValueFilterKind';

export interface InValueFilter<TValue> {
  filters: NonNullable<TValue>[];
  kind: ValueFilterKind.in;
}
