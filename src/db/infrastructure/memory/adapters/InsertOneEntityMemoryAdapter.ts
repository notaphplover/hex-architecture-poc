import { Converter } from '../../../../common/domain/modules/Converter';
import { InsertOneEntityPort } from '../../../application/ports/InsertOneEntityPort';
import { BaseEntity } from '../../../domain/models/BaseEntity';
import { InsertQuery } from '../service/BaseEntityMemoryPersistenceService';
import { UuidBasedEntityMemoryPersistenceService } from '../service/UuidBasedEntityMemoryPersistenceService';

export class InsertOneEntityMemoryAdapter<TQuery, TEntity extends BaseEntity>
  implements InsertOneEntityPort<TQuery, TEntity>
{
  readonly #insertQueryToMemoryInsertQueryConverter: Converter<
    TQuery,
    InsertQuery<TEntity>
  >;
  readonly #uuidBasedEntityMemoryPersistenceService: UuidBasedEntityMemoryPersistenceService<TEntity>;

  constructor(
    insertQueryToMemoryInsertQueryConverter: Converter<
      TQuery,
      InsertQuery<TEntity>
    >,
    uuidBasedEntityMemoryPersistenceService: UuidBasedEntityMemoryPersistenceService<TEntity>,
  ) {
    this.#insertQueryToMemoryInsertQueryConverter =
      insertQueryToMemoryInsertQueryConverter;
    this.#uuidBasedEntityMemoryPersistenceService =
      uuidBasedEntityMemoryPersistenceService;
  }

  public async adapt(query: TQuery): Promise<TEntity> {
    const memoryInsertQuery: InsertQuery<TEntity> =
      this.#insertQueryToMemoryInsertQueryConverter.convert(query);

    const entity: TEntity =
      this.#uuidBasedEntityMemoryPersistenceService.insert(memoryInsertQuery);

    return entity;
  }
}
