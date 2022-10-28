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
import { FindOneEntityPort } from '../../../application/ports/FindOneEntityPort';
import { EntityDb } from '../models/EntityDb';
import { FindOneQuery } from '../models/FindOneQuery';

@Injectable()
export class FindOneEntityCosmosDbSqlAdapter<
  TQuery,
  TEntity extends Entity<string>,
  TEntityDb extends EntityDb<string>,
> implements FindOneEntityPort<TQuery, TEntity>
{
  readonly #container: Container;
  readonly #entityDbToEntityConverter:
    | Converter<TEntityDb, TEntity>
    | ConverterAsync<TEntityDb, TEntity>;
  readonly #findOneQueryToCosmosDbSqlFindOneQueryConverter: Converter<
    TQuery,
    FindOneQuery<TEntityDb>
  >;
  readonly #findOneQueryToCosmosDbSqlFeedOptionsConverter:
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
    findOneQueryToCosmosDbSqlFindOneQueryConverter: Converter<
      TQuery,
      FindOneQuery<TEntityDb>
    >,
    findOneQueryToCosmosDbSqlFeedOptionsConverter:
      | Converter<TQuery, FeedOptions>
      | undefined,
    cosmosDbSqlFindOneQueryToCosmosDbSqlQuerySpecConverter: Converter<
      FindOneQuery<TEntityDb>,
      SqlQuerySpec
    >,
  ) {
    this.#container = container;
    this.#entityDbToEntityConverter = entityDbToEntityConverter;
    this.#findOneQueryToCosmosDbSqlFindOneQueryConverter =
      findOneQueryToCosmosDbSqlFindOneQueryConverter;
    this.#findOneQueryToCosmosDbSqlFeedOptionsConverter =
      findOneQueryToCosmosDbSqlFeedOptionsConverter;
    this.#cosmosDbSqlFindOneQueryToCosmosDbSqlQuerySpecConverter =
      cosmosDbSqlFindOneQueryToCosmosDbSqlQuerySpecConverter;
  }

  public async adapt(query: TQuery): Promise<TEntity | undefined> {
    const findOneQuery: FindOneQuery<TEntityDb> =
      this.#findOneQueryToCosmosDbSqlFindOneQueryConverter.convert(query);
    const sqlQuerySpec: SqlQuerySpec =
      this.#cosmosDbSqlFindOneQueryToCosmosDbSqlQuerySpecConverter.convert(
        findOneQuery,
      );

    const feedOptions: FeedOptions | undefined =
      this.#findOneQueryToCosmosDbSqlFeedOptionsConverter?.convert(query);

    const response: FeedResponse<TEntityDb> = await (
      this.#container.items.query(
        sqlQuerySpec,
        feedOptions,
      ) as QueryIterator<TEntityDb>
    ).fetchAll();

    const entityDbOrUndefined: TEntityDb | undefined = response.resources[0];

    let entityOrUndefined: TEntity | undefined;

    if (entityDbOrUndefined === undefined) {
      entityOrUndefined = undefined;
    } else {
      entityOrUndefined = await this.#entityDbToEntityConverter.convert(
        entityDbOrUndefined,
      );
    }

    return entityOrUndefined;
  }
}
