import { Entity } from '../../../../common/domain/models/Entity';
import { Converter } from '../../../../common/domain/modules/Converter';
import { FindOneEntityPort } from '../../../application/ports/FindOneEntityPort';
import { EntityDb } from '../models/EntityDb';
import { FindOneQuery } from '../service/BaseEntityMemoryPersistenceService';
import { UuidBasedEntityMemoryPersistenceService } from '../service/UuidBasedEntityMemoryPersistenceService';

export class FindOneEntityMemoryAdapter<
  TQuery,
  TEntity extends Entity<string>,
  TEntityDb extends EntityDb<string>,
> implements FindOneEntityPort<TQuery, TEntity>
{
  readonly #entityDbToEntityConverter: Converter<TEntityDb, TEntity>;
  readonly #findQueryToMemoryFindOneQueryConverter: Converter<
    TQuery,
    FindOneQuery<TEntityDb>
  >;
  readonly #uuidBasedEntityMemoryPersistenceService: UuidBasedEntityMemoryPersistenceService<TEntityDb>;

  constructor(
    entityDbToEntityConverter: Converter<TEntityDb, TEntity>,
    findQueryToMemoryFindOneQueryConverter: Converter<
      TQuery,
      FindOneQuery<TEntityDb>
    >,
    uuidBasedEntityMemoryPersistenceService: UuidBasedEntityMemoryPersistenceService<TEntityDb>,
  ) {
    this.#entityDbToEntityConverter = entityDbToEntityConverter;
    this.#findQueryToMemoryFindOneQueryConverter =
      findQueryToMemoryFindOneQueryConverter;
    this.#uuidBasedEntityMemoryPersistenceService =
      uuidBasedEntityMemoryPersistenceService;
  }

  public async adapt(query: TQuery): Promise<TEntity | undefined> {
    const memoryFindOneQuery: FindOneQuery<TEntityDb> =
      this.#findQueryToMemoryFindOneQueryConverter.convert(query);

    const entityDbOrUndefined: TEntityDb | undefined =
      this.#uuidBasedEntityMemoryPersistenceService.findOne(memoryFindOneQuery);

    let entityOrUndefined: TEntity | undefined;

    if (entityDbOrUndefined === undefined) {
      entityOrUndefined = undefined;
    } else {
      entityOrUndefined =
        this.#entityDbToEntityConverter.convert(entityDbOrUndefined);
    }

    return entityOrUndefined;
  }
}
