import { EntityDb } from './EntityDb';
import { Filter } from './Filter';

export interface FindOneQuery<TEntity extends EntityDb = EntityDb> {
  filters: Filter<TEntity>;
}
