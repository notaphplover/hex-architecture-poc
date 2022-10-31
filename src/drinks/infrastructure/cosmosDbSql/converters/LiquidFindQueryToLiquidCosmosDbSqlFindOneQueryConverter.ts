import { Injectable } from '@nestjs/common';

import { Converter } from '../../../../common/domain/modules/Converter';
import { CosmosDbSqlContainerName } from '../../../../db/infrastructure/cosmosDbSql/models/CosmosDbSqlContainerName';
import { Filter } from '../../../../db/infrastructure/cosmosDbSql/models/Filter';
import { FindOneQuery } from '../../../../db/infrastructure/cosmosDbSql/models/FindOneQuery';
import { ValueFilterKind } from '../../../../db/infrastructure/cosmosDbSql/models/ValueFilterKind';
import { LiquidFindQuery } from '../../../application/queries/LiquidFindQuery';
import { LiquidCosmosDbSql } from '../models/LiquidCosmosDbSql';

@Injectable()
export class LiquidFindQueryToLiquidCosmosDbSqlFindOneQueryConverter
  implements Converter<LiquidFindQuery, FindOneQuery<LiquidCosmosDbSql>>
{
  public convert(
    liquidFindQuery: LiquidFindQuery,
  ): FindOneQuery<LiquidCosmosDbSql> {
    let filters: Filter<LiquidCosmosDbSql>;
    if (liquidFindQuery.ids.length === 1) {
      const id: string = liquidFindQuery.ids[0] as string;
      filters = { id: id };
    } else {
      filters = {
        id: {
          filters: liquidFindQuery.ids,
          kind: ValueFilterKind.in,
        },
      };
    }

    return {
      collectionName: CosmosDbSqlContainerName.liquids,
      filters,
    };
  }
}
