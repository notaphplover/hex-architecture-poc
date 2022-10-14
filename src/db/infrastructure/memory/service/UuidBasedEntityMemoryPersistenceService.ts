import { randomUUID } from 'crypto';

import {
  BaseEntity,
  BaseEntityMemoryPersistenceService,
} from './BaseEntityMemoryPersistenceService';

export class UuidBasedEntityMemoryPersistenceService<
  TEntity extends BaseEntity<string>,
> extends BaseEntityMemoryPersistenceService<TEntity, string> {
  protected generateId(): string {
    return randomUUID();
  }
}
