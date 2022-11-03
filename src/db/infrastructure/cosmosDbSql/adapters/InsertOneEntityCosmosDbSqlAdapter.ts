import { randomUUID } from 'crypto';

import { Container } from '@azure/cosmos';

import { Entity } from '../../../../common/domain/models/Entity';
import { Converter } from '../../../../common/domain/modules/Converter';
import { ConverterAsync } from '../../../../common/domain/modules/ConverterAsync';
import { AppError } from '../../../../errors/application/models/AppError';
import { AppErrorKind } from '../../../../errors/application/models/AppErrorKind';
import { InsertOneEntityPort } from '../../../application/ports/InsertOneEntityPort';
import { EntityDb } from '../models/EntityDb';
import { InsertQuery } from '../models/InsertQuery';

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
    InsertQuery<TEntityDb>
  >;

  constructor(
    container: Container,
    entityDbToEntityConverter:
      | Converter<TEntityDb, TEntity>
      | ConverterAsync<TEntityDb, TEntity>,
    insertOneQueryToCosmosDbSqlInsertQueryConverter: Converter<
      TQuery,
      InsertQuery<TEntityDb>
    >,
  ) {
    this.#container = container;
    this.#entityDbToEntityConverter = entityDbToEntityConverter;
    this.#insertOneQueryToCosmosDbSqlInsertQueryConverter =
      insertOneQueryToCosmosDbSqlInsertQueryConverter;
  }

  public async adapt(query: TQuery): Promise<TEntity> {
    const insertQuery: InsertQuery<TEntityDb> =
      this.#insertOneQueryToCosmosDbSqlInsertQueryConverter.convert(query);

    let entityDbToCreate: TEntityDb;

    if ((insertQuery as TEntityDb).id === undefined) {
      entityDbToCreate = { ...insertQuery, id: randomUUID() } as TEntityDb;
    } else {
      entityDbToCreate = insertQuery as TEntityDb;
    }

    const entityDb: TEntityDb | undefined = (
      await this.#container.items.create(entityDbToCreate, {
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
