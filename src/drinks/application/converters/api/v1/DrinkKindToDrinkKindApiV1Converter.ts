import { Injectable } from '@nestjs/common';

import { Converter } from '../../../../../common/domain/modules/Converter';
import { DrinkKind } from '../../../../domain/models/DrinkKind';
import { DrinkKindApiV1 } from '../../../models/api/v1/DrinkKindApiV1';

const drinkKindToDrinkKindApiV1Map: {
  [TKey in DrinkKind]: DrinkKindApiV1;
} = Object.freeze({
  [DrinkKind.alcoholic]: DrinkKindApiV1.alcoholic,
  [DrinkKind.soda]: DrinkKindApiV1.soda,
});

@Injectable()
export class DrinkKindToDrinkKindApiV1Converter
  implements Converter<DrinkKind, DrinkKindApiV1>
{
  public convert(drinkKind: DrinkKind): DrinkKindApiV1 {
    return drinkKindToDrinkKindApiV1Map[drinkKind];
  }
}
