import { Injectable } from '@nestjs/common';

import { Converter } from '../../../../common/domain/modules/Converter';
import { FindOneQuery } from '../../../../db/infrastructure/cosmosDbSql/models/FindOneQuery';
import { FindQuery } from '../../../../db/infrastructure/cosmosDbSql/models/FindQuery';
import { LiquidFindQuery } from '../../../application/queries/LiquidFindQuery';
import { LiquidCosmosDbSql } from '../models/LiquidCosmosDbSql';

@Injectable()
export class LiquidFindQueryToLiquidCosmosDbSqlFindQueryConverter
  implements Converter<LiquidFindQuery, FindQuery<LiquidCosmosDbSql>>
{
  readonly #liquidFindQueryToLiquidCosmosDbSqlFindOneQueryConverter: Converter<
    LiquidFindQuery,
    FindOneQuery<LiquidCosmosDbSql>
  >;

  constructor(
    liquidFindQueryToLiquidCosmosDbSqlFindOneQueryConverter: Converter<
      LiquidFindQuery,
      FindOneQuery<LiquidCosmosDbSql>
    >,
  ) {
    this.#liquidFindQueryToLiquidCosmosDbSqlFindOneQueryConverter =
      liquidFindQueryToLiquidCosmosDbSqlFindOneQueryConverter;
  }

  public convert(
    liquidFindQuery: LiquidFindQuery,
  ): FindQuery<LiquidCosmosDbSql> {
    const liquidFindOneQuery: FindOneQuery<LiquidCosmosDbSql> =
      this.#liquidFindQueryToLiquidCosmosDbSqlFindOneQueryConverter.convert(
        liquidFindQuery,
      );

    return {
      collectionName: liquidFindOneQuery.collectionName,
      filters: liquidFindOneQuery.filters,
    };
  }
}
