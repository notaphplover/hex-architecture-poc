import { MultipleFilterKind } from './MultipleFilterKind';
import { ValueFilter } from './ValueFilter';

export interface BaseMultipleValueFilter<
  TKind extends MultipleFilterKind,
  TValue,
> {
  filters: ValueFilter<TValue>[];
  kind: TKind;
}
