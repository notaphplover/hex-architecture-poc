import { MultipleFilter } from './MultipleFilter';
import { SingleFilter } from './SingleFilter';

export type Filter<TValue> = MultipleFilter<TValue> | SingleFilter<TValue>;
