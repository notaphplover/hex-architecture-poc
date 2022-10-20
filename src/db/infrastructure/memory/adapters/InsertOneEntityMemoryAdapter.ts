import { Entity } from '../../../../common/domain/models/Entity';
import { Converter } from '../../../../common/domain/modules/Converter';
import { InsertOneEntityPort } from '../../../application/ports/InsertOneEntityPort';
import { EntityDb } from '../models/EntityDb';
import { InsertQuery } from '../service/BaseEntityMemoryPersistenceService';
import { UuidBasedEntityMemoryPersistenceService } from '../service/UuidBasedEntityMemoryPersistenceService';

export class InsertOneEntityMemoryAdapter<
  TQuery,
  TEntity extends Entity<string>,
  TEntityDb extends EntityDb<string>,
> implements InsertOneEntityPort<TQuery, TEntity>
{
  readonly #entityDbToEntityConverter: Converter<TEntityDb, TEntity>;
  readonly #insertQueryToMemoryInsertQueryConverter: Converter<
    TQuery,
    InsertQuery<TEntityDb>
  >;
  readonly #uuidBasedEntityMemoryPersistenceService: UuidBasedEntityMemoryPersistenceService<TEntityDb>;

  constructor(
    entityDbToEntityConverter: Converter<TEntityDb, TEntity>,
    insertQueryToMemoryInsertQueryConverter: Converter<
      TQuery,
      InsertQuery<TEntityDb>
    >,
    uuidBasedEntityMemoryPersistenceService: UuidBasedEntityMemoryPersistenceService<TEntityDb>,
  ) {
    this.#entityDbToEntityConverter = entityDbToEntityConverter;
    this.#insertQueryToMemoryInsertQueryConverter =
      insertQueryToMemoryInsertQueryConverter;
    this.#uuidBasedEntityMemoryPersistenceService =
      uuidBasedEntityMemoryPersistenceService;
  }

  public async adapt(query: TQuery): Promise<TEntity> {
    const memoryInsertQuery: InsertQuery<TEntityDb> =
      this.#insertQueryToMemoryInsertQueryConverter.convert(query);

    const entityDb: TEntityDb =
      this.#uuidBasedEntityMemoryPersistenceService.insert(memoryInsertQuery);

    const entity: TEntity = this.#entityDbToEntityConverter.convert(entityDb);

    return entity;
  }
}
