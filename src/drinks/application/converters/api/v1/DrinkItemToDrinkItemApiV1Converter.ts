import { Injectable } from '@nestjs/common';

import { Converter } from '../../../../../common/domain/modules/Converter';
import { DrinkItem } from '../../../../domain/models/DrinkItem';
import { DrinkItemApiV1 } from '../../../models/api/v1/DrinkItemApiV1';

@Injectable()
export class DrinkItemToDrinkItemApiV1Converter
  implements Converter<DrinkItem, DrinkItemApiV1>
{
  public convert(drinkItem: DrinkItem): DrinkItemApiV1 {
    return {
      liquid_id: drinkItem.liquid.id,
      milliliters: drinkItem.milliliters,
    };
  }
}
