import { Injectable } from '@nestjs/common';

import { Converter } from '../../../../common/domain/modules/Converter';
import { CosmosDbSqlContainerName } from '../../../../db/infrastructure/cosmosDbSql/models/CosmosDbSqlContainerName';
import { FindOneQuery } from '../../../../db/infrastructure/cosmosDbSql/models/FindOneQuery';
import { LiquidFindQuery } from '../../../application/queries/LiquidFindQuery';
import { LiquidCosmosDbSql } from '../models/LiquidCosmosDbSql';

@Injectable()
export class LiquidFindQueryToLiquidCosmosDbSqlFindOneQueryConverter
  implements Converter<LiquidFindQuery, FindOneQuery<LiquidCosmosDbSql>>
{
  public convert(
    liquidFindQuery: LiquidFindQuery,
  ): FindOneQuery<LiquidCosmosDbSql> {
    return {
      collectionName: CosmosDbSqlContainerName.liquids,
      filters: { id: liquidFindQuery.id },
    };
  }
}
