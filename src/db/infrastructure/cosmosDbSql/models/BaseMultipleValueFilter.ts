import { ValueFilter } from './ValueFilter';
import { ValueFilterKind } from './ValueFilterKind';

export interface BaseMultipleValueFilter<
  TKind extends ValueFilterKind,
  TValue,
> {
  filters: ValueFilter<TValue>[];
  kind: TKind;
}
