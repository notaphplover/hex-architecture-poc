import { Injectable } from '@nestjs/common';

import { Converter } from '../../../../common/domain/modules/Converter';
import { DrinkItem } from '../../../domain/models/DrinkItem';
import { DrinkItemCosmosDbSql } from '../models/DrinkItemCosmosDbSql';

@Injectable()
export class DrinkItemToDrinkItemCosmosDbSqlConverter
  implements Converter<DrinkItem, DrinkItemCosmosDbSql>
{
  public convert(drinkItem: DrinkItem): DrinkItemCosmosDbSql {
    return {
      liquid_id: drinkItem.liquid.id,
      milliliters: drinkItem.milliliters,
    };
  }
}
