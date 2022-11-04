import { Injectable } from '@nestjs/common';

import { Converter } from '../../../../common/domain/modules/Converter';
import { CosmosDbSqlContainerName } from '../../../../db/infrastructure/cosmosDbSql/models/CosmosDbSqlContainerName';
import { Filter } from '../../../../db/infrastructure/cosmosDbSql/models/Filter';
import { FindOneQuery } from '../../../../db/infrastructure/cosmosDbSql/models/FindOneQuery';
import { ValueFilterKind } from '../../../../db/infrastructure/cosmosDbSql/models/ValueFilterKind';
import { DrinkFindQuery } from '../../../application/queries/DrinkFindQuery';
import { DrinkCosmosDbSql } from '../models/DrinkCosmosDbSql';

@Injectable()
export class DrinkFindQueryToDrinkCosmosDbSqlFindOneQueryConverter
  implements Converter<DrinkFindQuery, FindOneQuery<DrinkCosmosDbSql>>
{
  public convert(
    drinkFindQuery: DrinkFindQuery,
  ): FindOneQuery<DrinkCosmosDbSql> {
    let filters: Filter<DrinkCosmosDbSql>;
    if (drinkFindQuery.ids.length === 1) {
      const id: string = drinkFindQuery.ids[0] as string;
      filters = { id: id };
    } else {
      filters = {
        id: {
          filters: drinkFindQuery.ids,
          kind: ValueFilterKind.in,
        },
      };
    }

    return {
      collectionName: CosmosDbSqlContainerName.drinks,
      filters,
    };
  }
}
