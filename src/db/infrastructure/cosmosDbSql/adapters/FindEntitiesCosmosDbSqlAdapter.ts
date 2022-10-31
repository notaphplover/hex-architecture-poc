import {
  Container,
  FeedOptions,
  FeedResponse,
  QueryIterator,
  SqlQuerySpec,
} from '@azure/cosmos';
import { Injectable } from '@nestjs/common';

import { Entity } from '../../../../common/domain/models/Entity';
import { Converter } from '../../../../common/domain/modules/Converter';
import { ConverterAsync } from '../../../../common/domain/modules/ConverterAsync';
import { FindEntitiesPort } from '../../../application/ports/FindEntititesPort';
import { EntityDb } from '../models/EntityDb';
import { FindOneQuery } from '../models/FindOneQuery';

@Injectable()
export class FindEntitiesCosmosDbSqlAdapter<
  TQuery,
  TEntity extends Entity<string>,
  TEntityDb extends EntityDb<string>,
> implements FindEntitiesPort<TQuery, TEntity>
{
  readonly #container: Container;
  readonly #entityDbToEntityConverter:
    | Converter<TEntityDb, TEntity>
    | ConverterAsync<TEntityDb, TEntity>;
  readonly #findQueryToCosmosDbSqlFindOneQueryConverter: Converter<
    TQuery,
    FindOneQuery<TEntityDb>
  >;
  readonly #findQueryToCosmosDbSqlFeedOptionsConverter:
    | Converter<TQuery, FeedOptions>
    | undefined;
  readonly #cosmosDbSqlFindOneQueryToCosmosDbSqlQuerySpecConverter: Converter<
    FindOneQuery<TEntityDb>,
    SqlQuerySpec
  >;

  constructor(
    container: Container,
    entityDbToEntityConverter:
      | Converter<TEntityDb, TEntity>
      | ConverterAsync<TEntityDb, TEntity>,
    findQueryToCosmosDbSqlFindOneQueryConverter: Converter<
      TQuery,
      FindOneQuery<TEntityDb>
    >,
    findQueryToCosmosDbSqlFeedOptionsConverter:
      | Converter<TQuery, FeedOptions>
      | undefined,
    cosmosDbSqlFindOneQueryToCosmosDbSqlQuerySpecConverter: Converter<
      FindOneQuery<TEntityDb>,
      SqlQuerySpec
    >,
  ) {
    this.#container = container;
    this.#entityDbToEntityConverter = entityDbToEntityConverter;
    this.#findQueryToCosmosDbSqlFindOneQueryConverter =
      findQueryToCosmosDbSqlFindOneQueryConverter;
    this.#findQueryToCosmosDbSqlFeedOptionsConverter =
      findQueryToCosmosDbSqlFeedOptionsConverter;
    this.#cosmosDbSqlFindOneQueryToCosmosDbSqlQuerySpecConverter =
      cosmosDbSqlFindOneQueryToCosmosDbSqlQuerySpecConverter;
  }

  public async adapt(query: TQuery): Promise<TEntity[]> {
    const findOneQuery: FindOneQuery<TEntityDb> =
      this.#findQueryToCosmosDbSqlFindOneQueryConverter.convert(query);
    const sqlQuerySpec: SqlQuerySpec =
      this.#cosmosDbSqlFindOneQueryToCosmosDbSqlQuerySpecConverter.convert(
        findOneQuery,
      );

    const feedOptions: FeedOptions | undefined =
      this.#findQueryToCosmosDbSqlFeedOptionsConverter?.convert(query);

    const response: FeedResponse<TEntityDb> = await (
      this.#container.items.query(
        sqlQuerySpec,
        feedOptions,
      ) as QueryIterator<TEntityDb>
    ).fetchAll();

    const entityDbList: TEntityDb[] = response.resources;

    const entityList: TEntity[] = await Promise.all(
      entityDbList.map((entityDb: TEntityDb) =>
        this.#entityDbToEntityConverter.convert(entityDb),
      ),
    );

    return entityList;
  }
}
