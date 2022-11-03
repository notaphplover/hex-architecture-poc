import { Injectable } from '@nestjs/common';

import { Converter } from '../../../../common/domain/modules/Converter';
import { DrinkKind } from '../../../domain/models/DrinkKind';
import { DrinkKindCosmosDbSql } from '../models/DrinkKindCosmosDbSql';

const drinkKindToDrinkKindCosmosDbSqlMap: {
  [TKey in DrinkKind]: DrinkKindCosmosDbSql;
} = {
  [DrinkKind.alcoholic]: DrinkKindCosmosDbSql.alcoholic,
  [DrinkKind.soda]: DrinkKindCosmosDbSql.soda,
};

@Injectable()
export class DrinkKindToDrinkKindCosmosDbSqlConverter
  implements Converter<DrinkKind, DrinkKindCosmosDbSql>
{
  public convert(drinkKind: DrinkKind): DrinkKindCosmosDbSql {
    return drinkKindToDrinkKindCosmosDbSqlMap[drinkKind];
  }
}
