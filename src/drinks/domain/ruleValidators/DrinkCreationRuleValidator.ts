import { Injectable } from '@nestjs/common';

import { RuleValidator } from '../../../common/domain/modules/RuleValidator';
import { DrinkKind } from '../models/DrinkKind';
import { Liquid } from '../models/Liquid';
import { LiquidKind } from '../models/LiquidKind';

@Injectable()
export class DrinkCreationRuleValidator
  implements RuleValidator<[DrinkKind, Liquid[]]>
{
  public isValid(drinkKind: DrinkKind, liquids: Liquid[]): boolean {
    switch (drinkKind) {
      case DrinkKind.alcoholic:
        return this.#hasAlcoholLiquids(liquids);
      case DrinkKind.soda:
        return !this.#hasAlcoholLiquids(liquids);
    }
  }

  #hasAlcoholLiquids(liquids: Liquid[]): boolean {
    return liquids.some(
      (liquid: Liquid): boolean => liquid.kind === LiquidKind.alcohol,
    );
  }
}
