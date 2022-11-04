import { Inject, Injectable } from '@nestjs/common';

import { Handler } from '../../../common/application/modules/Handler';
import { InsertOneEntityPort } from '../../../db/application/ports/InsertOneEntityPort';
import { drinksInjectionSymbolsMap } from '../../domain/injection/drinksInjectionSymbolsMap';
import { Drink } from '../../domain/models/Drink';
import { DrinkInsertQuery } from '../queries/DrinkInsertQuery';

@Injectable()
export class InsertOneDrinkHandler implements Handler<DrinkInsertQuery, Drink> {
  readonly #insertOneDrinkPort: InsertOneEntityPort<DrinkInsertQuery, Drink>;

  constructor(
    @Inject(drinksInjectionSymbolsMap.insertOneDrinkAdapter)
    insertOneDrinkPort: InsertOneEntityPort<DrinkInsertQuery, Drink>,
  ) {
    this.#insertOneDrinkPort = insertOneDrinkPort;
  }

  public async handle(drinkInsertQuery: DrinkInsertQuery): Promise<Drink> {
    return this.#insertOneDrinkPort.adapt(drinkInsertQuery);
  }
}
