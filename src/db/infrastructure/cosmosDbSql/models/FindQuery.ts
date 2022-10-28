import { EntityDb } from './EntityDb';
import { Filter } from './Filter';
import { FindQueryPaginationOptions } from './FindQueryPaginationOptions';

export interface FindQuery<TEntity extends EntityDb = EntityDb> {
  filters: Filter<TEntity>;
  paginationOptions?: FindQueryPaginationOptions;
}
