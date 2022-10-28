import { EntityDb } from './EntityDb';

export type InsertQuery<TEntity extends EntityDb = EntityDb> =
  | TEntity
  | Omit<TEntity, 'id'>;
