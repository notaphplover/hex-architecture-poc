import { Inject, Injectable } from '@nestjs/common';

import { Converter } from '../../../../../common/domain/modules/Converter';
import { drinksInjectionSymbolsMap } from '../../../../domain/injection/drinksInjectionSymbolsMap';
import { Drink } from '../../../../domain/models/Drink';
import { DrinkItem } from '../../../../domain/models/DrinkItem';
import { DrinkKind } from '../../../../domain/models/DrinkKind';
import { DrinkApiV1 } from '../models/DrinkApiV1';
import { DrinkItemApiV1 } from '../models/DrinkItemApiV1';
import { DrinkKindApiV1 } from '../models/DrinkKindApiV1';

@Injectable()
export class DrinkToDrinkApiV1Converter
  implements Converter<Drink, DrinkApiV1>
{
  readonly #drinkItemToDrinkItemApiV1Converter: Converter<
    DrinkItem,
    DrinkItemApiV1
  >;
  readonly #drinkKindToDrinkKindApiV1Converter: Converter<
    DrinkKind,
    DrinkKindApiV1
  >;

  constructor(
    @Inject(drinksInjectionSymbolsMap.drinkItemToDrinkItemApiV1Converter)
    drinkItemToDrinkItemApiV1Converter: Converter<DrinkItem, DrinkItemApiV1>,
    @Inject(drinksInjectionSymbolsMap.drinkKindToDrinkKindApiV1Converter)
    drinkKindToDrinkKindApiV1Converter: Converter<DrinkKind, DrinkKindApiV1>,
  ) {
    this.#drinkItemToDrinkItemApiV1Converter =
      drinkItemToDrinkItemApiV1Converter;
    this.#drinkKindToDrinkKindApiV1Converter =
      drinkKindToDrinkKindApiV1Converter;
  }

  public convert(drink: Drink): DrinkApiV1 {
    return {
      id: drink.id,
      items: drink.items.map((drinkItem: DrinkItem) =>
        this.#drinkItemToDrinkItemApiV1Converter.convert(drinkItem),
      ),
      kind: this.#drinkKindToDrinkKindApiV1Converter.convert(drink.kind),
      name: drink.name,
    };
  }
}
