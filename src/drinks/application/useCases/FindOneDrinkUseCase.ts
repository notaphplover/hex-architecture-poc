import { Inject, Injectable } from '@nestjs/common';

import { UseCase } from '../../../common/application/modules/UseCase';
import { FindOneEntityPort } from '../../../db/application/ports/FindOneEntityPort';
import { drinksInjectionSymbolsMap } from '../../domain/injection/drinksInjectionSymbolsMap';
import { Drink } from '../../domain/models/Drink';
import { DrinkFindQuery } from '../queries/DrinkFindQuery';

@Injectable()
export class FindOneDrinkUseCase
  implements UseCase<DrinkFindQuery, Drink | undefined>
{
  readonly #findOneDrinkPort: FindOneEntityPort<DrinkFindQuery, Drink>;

  constructor(
    @Inject(drinksInjectionSymbolsMap.findOneDrinkAdapter)
    findOneDrinkPort: FindOneEntityPort<DrinkFindQuery, Drink>,
  ) {
    this.#findOneDrinkPort = findOneDrinkPort;
  }

  public async handle(
    drinkFindQuery: DrinkFindQuery,
  ): Promise<Drink | undefined> {
    return this.#findOneDrinkPort.adapt(drinkFindQuery);
  }
}
