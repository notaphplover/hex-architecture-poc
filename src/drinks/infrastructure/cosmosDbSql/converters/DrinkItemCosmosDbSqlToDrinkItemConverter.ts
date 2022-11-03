import { Injectable } from '@nestjs/common';

import { Converter } from '../../../../common/domain/modules/Converter';
import { AppError } from '../../../../errors/application/models/AppError';
import { AppErrorKind } from '../../../../errors/application/models/AppErrorKind';
import { DrinkItem } from '../../../domain/models/DrinkItem';
import { Liquid } from '../../../domain/models/Liquid';
import { DrinkItemCosmosDbSql } from '../models/DrinkItemCosmosDbSql';

@Injectable()
export class DrinkItemCosmosDbSqlToDrinkItemConverter
  implements Converter<DrinkItemCosmosDbSql, DrinkItem, Liquid>
{
  public convert(
    drinkItemCosmosDbSql: DrinkItemCosmosDbSql,
    liquid: Liquid,
  ): DrinkItem {
    if (drinkItemCosmosDbSql.liquid_id !== liquid.id) {
      throw new AppError(
        AppErrorKind.unknown,
        'Unexpected attempt to create a drink item from a liquid with different id',
      );
    }

    return {
      liquid: liquid,
      milliliters: drinkItemCosmosDbSql.milliliters,
    };
  }
}
