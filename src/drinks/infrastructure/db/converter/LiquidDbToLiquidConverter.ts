import { Inject, Injectable } from '@nestjs/common';

import { Converter } from '../../../../common/domain/modules/Converter';
import { drinksInjectionSymbolsMap } from '../../../domain/injection/drinksInjectionSymbolsMap';
import { Liquid } from '../../../domain/models/Liquid';
import { LiquidKind } from '../../../domain/models/LiquidKind';
import { LiquidDb } from '../models/LiquidDb';
import { LiquidKindDb } from '../models/LiquidKindDb';

@Injectable()
export class LiquidDbToLiquidConverter implements Converter<LiquidDb, Liquid> {
  readonly #liquidKindDbToLiquidKindConverter: Converter<
    LiquidKindDb,
    LiquidKind
  >;
  constructor(
    @Inject(drinksInjectionSymbolsMap.liquidKindDbToLiquidKindConverter)
    liquidKindDbToLiquidKindConverter: Converter<LiquidKindDb, LiquidKind>,
  ) {
    this.#liquidKindDbToLiquidKindConverter = liquidKindDbToLiquidKindConverter;
  }

  public convert(limitDb: LiquidDb): Liquid {
    return {
      id: limitDb.id,
      kind: this.#liquidKindDbToLiquidKindConverter.convert(limitDb.kind),
      name: limitDb.name,
    };
  }
}
