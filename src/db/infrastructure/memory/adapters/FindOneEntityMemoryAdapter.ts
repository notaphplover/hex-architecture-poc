import { Converter } from '../../../../common/domain/modules/Converter';
import { FindOneEntityPort } from '../../../application/ports/FindOneEntityPort';
import { BaseEntity } from '../../../domain/models/BaseEntity';
import { UuidBasedEntityMemoryPersistenceService } from '../service/UuidBasedEntityMemoryPersistenceService';

export class FindOneEntityMemoryAdapter<TQuery, TEntity extends BaseEntity>
  implements FindOneEntityPort<TQuery, TEntity>
{
  readonly #findQueryToMemoryFindQueryConverter: Converter<TQuery, string>;
  readonly #uuidBasedEntityMemoryPersistenceService: UuidBasedEntityMemoryPersistenceService<TEntity>;

  constructor(
    findQueryToMemoryFindQueryConverter: Converter<TQuery, string>,
    uuidBasedEntityMemoryPersistenceService: UuidBasedEntityMemoryPersistenceService<TEntity>,
  ) {
    this.#findQueryToMemoryFindQueryConverter =
      findQueryToMemoryFindQueryConverter;
    this.#uuidBasedEntityMemoryPersistenceService =
      uuidBasedEntityMemoryPersistenceService;
  }

  public async adapt(query: TQuery): Promise<TEntity | undefined> {
    const memoryFindQuery: string =
      this.#findQueryToMemoryFindQueryConverter.convert(query);

    const entity: TEntity | undefined =
      this.#uuidBasedEntityMemoryPersistenceService.find(memoryFindQuery);

    return entity;
  }
}
