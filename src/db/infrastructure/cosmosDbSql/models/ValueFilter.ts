import { MultipleValueFilter } from './MultipleValueFilter';
import { NegationValueFilter } from './NegationValueFilter';

export type ValueFilter<TValue> =
  | TValue
  | MultipleValueFilter<TValue>
  | NegationValueFilter<TValue>;
