import { Injectable } from '@nestjs/common';

import { Converter } from '../../../../common/domain/modules/Converter';
import { DrinkKind } from '../../../domain/models/DrinkKind';
import { DrinkKindCosmosDbSql } from '../models/DrinkKindCosmosDbSql';

const drinkKindCosmosDbSqlToDrinkKindMap: {
  [TKey in DrinkKindCosmosDbSql]: DrinkKind;
} = {
  [DrinkKindCosmosDbSql.alcoholic]: DrinkKind.alcoholic,
  [DrinkKindCosmosDbSql.soda]: DrinkKind.soda,
};

@Injectable()
export class DrinkKindCosmosDbSqlToDrinkKindConverter
  implements Converter<DrinkKindCosmosDbSql, DrinkKind>
{
  public convert(drinkKindCosmosDbSql: DrinkKindCosmosDbSql): DrinkKind {
    return drinkKindCosmosDbSqlToDrinkKindMap[drinkKindCosmosDbSql];
  }
}
