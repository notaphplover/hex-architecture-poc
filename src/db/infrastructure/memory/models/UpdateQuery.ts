import { EntityDb } from './EntityDb';

export type UpdateQuery<TEntity extends EntityDb = EntityDb> = Partial<TEntity>;
