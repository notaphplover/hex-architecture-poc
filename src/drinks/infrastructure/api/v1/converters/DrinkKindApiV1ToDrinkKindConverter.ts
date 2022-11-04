import { Injectable } from '@nestjs/common';

import { Converter } from '../../../../../common/domain/modules/Converter';
import { DrinkKind } from '../../../../domain/models/DrinkKind';
import { DrinkKindApiV1 } from '../models/DrinkKindApiV1';

const drinkKindApiV1ToDrinkKindMap: {
  [TKey in DrinkKindApiV1]: DrinkKind;
} = Object.freeze({
  [DrinkKindApiV1.alcoholic]: DrinkKind.alcoholic,
  [DrinkKindApiV1.soda]: DrinkKind.soda,
});

@Injectable()
export class DrinkKindApiV1ToDrinkKindConverter
  implements Converter<DrinkKindApiV1, DrinkKind>
{
  public convert(drinkKindApiV1: DrinkKindApiV1): DrinkKind {
    return drinkKindApiV1ToDrinkKindMap[drinkKindApiV1];
  }
}
