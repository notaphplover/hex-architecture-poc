import { Inject, Injectable } from '@nestjs/common';

import { Handler } from '../../../common/application/modules/Handler';
import { InsertOneEntityPort } from '../../../db/application/ports/InsertOneEntityPort';
import { AppError } from '../../../errors/application/models/AppError';
import { AppErrorKind } from '../../../errors/application/models/AppErrorKind';
import { drinksInjectionSymbolsMap } from '../../domain/injection/drinksInjectionSymbolsMap';
import { Drink } from '../../domain/models/Drink';
import { DrinkItem } from '../../domain/models/DrinkItem';
import { Liquid } from '../../domain/models/Liquid';
import { DrinkCreationRuleValidator } from '../../domain/ruleValidators/DrinkCreationRuleValidator';
import { DrinkInsertQuery } from '../queries/DrinkInsertQuery';

@Injectable()
export class InsertOneDrinkHandler implements Handler<DrinkInsertQuery, Drink> {
  readonly #drinkCreationRuleValidator: DrinkCreationRuleValidator;
  readonly #insertOneDrinkPort: InsertOneEntityPort<DrinkInsertQuery, Drink>;

  constructor(
    @Inject(drinksInjectionSymbolsMap.drinkCreationRuleValidator)
    drinkCreationRuleValidator: DrinkCreationRuleValidator,
    @Inject(drinksInjectionSymbolsMap.insertOneDrinkAdapter)
    insertOneDrinkPort: InsertOneEntityPort<DrinkInsertQuery, Drink>,
  ) {
    this.#drinkCreationRuleValidator = drinkCreationRuleValidator;
    this.#insertOneDrinkPort = insertOneDrinkPort;
  }

  public async handle(drinkInsertQuery: DrinkInsertQuery): Promise<Drink> {
    if (
      this.#drinkCreationRuleValidator.isValid(
        drinkInsertQuery.kind,
        drinkInsertQuery.items.map(
          (drinkItem: DrinkItem): Liquid => drinkItem.liquid,
        ),
      )
    ) {
      return this.#insertOneDrinkPort.adapt(drinkInsertQuery);
    } else {
      throw new AppError(
        AppErrorKind.unprocessableOperation,
        'The drink could not be created!',
      );
    }
  }
}
