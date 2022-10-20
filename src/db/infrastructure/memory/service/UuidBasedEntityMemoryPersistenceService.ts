import { randomUUID } from 'crypto';

import { EntityDb } from '../models/EntityDb';
import { BaseEntityMemoryPersistenceService } from './BaseEntityMemoryPersistenceService';

export class UuidBasedEntityMemoryPersistenceService<
  TEntity extends EntityDb<string>,
> extends BaseEntityMemoryPersistenceService<TEntity, string> {
  protected generateId(): string {
    return randomUUID();
  }
}
