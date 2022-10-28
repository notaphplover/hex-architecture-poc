import { ValueFilter } from './ValueFilter';

export type SingleFilter<TEntity> = {
  [P in keyof TEntity]?: ValueFilter<TEntity[P]>;
};
