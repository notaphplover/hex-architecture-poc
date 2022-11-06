import { Injectable } from '@nestjs/common';

import { Converter } from '../../../../../common/domain/modules/Converter';
import { AppError } from '../../../../../errors/application/models/AppError';
import { AppErrorKind } from '../../../../../errors/application/models/AppErrorKind';
import { DrinkItem } from '../../../../domain/models/DrinkItem';
import { Liquid } from '../../../../domain/models/Liquid';
import { DrinkItemApiV1 } from '../../../models/api/v1/DrinkItemApiV1';

@Injectable()
export class DrinkItemApiV1ToDrinkItemConverter
  implements Converter<DrinkItemApiV1, DrinkItem, Liquid>
{
  public convert(
    drinkItemCosmosDbSql: DrinkItemApiV1,
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
