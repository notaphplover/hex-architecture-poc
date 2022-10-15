import { Inject, Injectable } from '@nestjs/common';

import { Converter } from '../../../../../common/domain/modules/Converter';
import { drinksInjectionSymbolsMap } from '../../../../domain/injection/drinksInjectionSymbolsMap';
import { Liquid } from '../../../../domain/models/Liquid';
import { LiquidKind } from '../../../../domain/models/LiquidKind';
import { LiquidApiV1 } from '../models/LiquidApiV1';
import { LiquidKindApiV1 } from '../models/LiquidKindApiV1';

@Injectable()
export class LiquidToLiquidApiV1Converter
  implements Converter<Liquid, LiquidApiV1>
{
  readonly #liquidKindToLiquidKindApiV1Converter: Converter<
    LiquidKind,
    LiquidKindApiV1
  >;

  constructor(
    @Inject(drinksInjectionSymbolsMap.liquidKindToLiquidKindApiV1Converter)
    liquidKindToLiquidKindApiV1Converter: Converter<
      LiquidKind,
      LiquidKindApiV1
    >,
  ) {
    this.#liquidKindToLiquidKindApiV1Converter =
      liquidKindToLiquidKindApiV1Converter;
  }

  public convert(liquid: Liquid): LiquidApiV1 {
    return {
      id: liquid.id,
      kind: this.#liquidKindToLiquidKindApiV1Converter.convert(liquid.kind),
      name: liquid.name,
    };
  }
}
