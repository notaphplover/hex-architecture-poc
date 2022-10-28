import { Container } from '@azure/cosmos';

import { Entity } from '../../../../common/domain/models/Entity';
import { Converter } from '../../../../common/domain/modules/Converter';
import { ConverterAsync } from '../../../../common/domain/modules/ConverterAsync';
import { AppError } from '../../../../errors/application/models/AppError';
import { AppErrorKind } from '../../../../errors/application/models/AppErrorKind';
import { InsertOneEntityPort } from '../../../application/ports/InsertOneEntityPort';
import { EntityDb } from '../models/EntityDb';

export class InsertOneEntityCosmosDbSqlAdapter<
  TQuery,
  TEntity extends Entity<string>,
  TEntityDb extends EntityDb<string>,
> implements InsertOneEntityPort<TQuery, TEntity>
{
  readonly #container: Container;
  readonly #entityDbToEntityConverter:
    | Converter<TEntityDb, TEntity>
    | ConverterAsync<TEntityDb, TEntity>;
  readonly #insertOneQueryToCosmosDbSqlInsertQueryConverter: Converter<
    TQuery,
    TEntityDb
  >;

  constructor(
    container: Container,
    entityDbToEntityConverter:
      | Converter<TEntityDb, TEntity>
      | ConverterAsync<TEntityDb, TEntity>,
    insertOneQueryToCosmosDbSqlInsertQueryConverter: Converter<
      TQuery,
      TEntityDb
    >,
  ) {
    this.#container = container;
    this.#entityDbToEntityConverter = entityDbToEntityConverter;
    this.#insertOneQueryToCosmosDbSqlInsertQueryConverter =
      insertOneQueryToCosmosDbSqlInsertQueryConverter;
  }

  public async adapt(query: TQuery): Promise<TEntity> {
    const insertQuery: TEntityDb =
      this.#insertOneQueryToCosmosDbSqlInsertQueryConverter.convert(query);

    const entityDb: TEntityDb | undefined = (
      await this.#container.items.create(insertQuery, {
        disableAutomaticIdGeneration: true,
      })
    ).resource;

    if (entityDb === undefined) {
      throw new AppError(AppErrorKind.unknown, 'Unable to create an entity');
    }

    const entity: TEntity = await this.#entityDbToEntityConverter.convert(
      entityDb,
    );

    return entity;
  }
}
