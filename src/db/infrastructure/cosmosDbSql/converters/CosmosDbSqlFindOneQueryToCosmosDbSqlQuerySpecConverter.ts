import { SqlQuerySpec } from '@azure/cosmos';
import { Inject, Injectable } from '@nestjs/common';

import { Converter } from '../../../../common/domain/modules/Converter';
import { dbInjectionSymbolsMap } from '../../../domain/injection/dbInjectionSymbolsMap';
import { EntityDb } from '../models/EntityDb';
import { FindOneQuery } from '../models/FindOneQuery';
import { FindQuery } from '../models/FindQuery';
import { MapKey } from '../models/MapKey';

@Injectable()
export class CosmosDbSqlFindOneQueryToCosmosDbSqlQuerySpecConverter<
  TEntity extends EntityDb<MapKey>,
> implements Converter<FindOneQuery<TEntity>, SqlQuerySpec>
{
  readonly #cosmosDbSqlFindQueryToCosmosDbSqlQuerySpecConverter: Converter<
    FindQuery<TEntity>,
    SqlQuerySpec
  >;

  constructor(
    @Inject(
      dbInjectionSymbolsMap.cosmosDbSqlFindQueryToCosmosDbSqlQuerySpecConverter,
    )
    cosmosDbSqlFindQueryToCosmosDbSqlQuerySpecConverter: Converter<
      FindQuery<TEntity>,
      SqlQuerySpec
    >,
  ) {
    this.#cosmosDbSqlFindQueryToCosmosDbSqlQuerySpecConverter =
      cosmosDbSqlFindQueryToCosmosDbSqlQuerySpecConverter;
  }

  public convert(findOneQuery: FindOneQuery<TEntity>): SqlQuerySpec {
    const findQuery: FindQuery<TEntity> = {
      collectionName: findOneQuery.collectionName,
      filters: findOneQuery.filters,
      paginationOptions: {
        limit: 1,
      },
    };

    return this.#cosmosDbSqlFindQueryToCosmosDbSqlQuerySpecConverter.convert(
      findQuery,
    );
  }
}
