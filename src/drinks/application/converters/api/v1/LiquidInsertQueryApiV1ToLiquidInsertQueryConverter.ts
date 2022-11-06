import { Inject, Injectable } from '@nestjs/common';

import { Converter } from '../../../../../common/domain/modules/Converter';
import { drinksInjectionSymbolsMap } from '../../../../domain/injection/drinksInjectionSymbolsMap';
import { LiquidKind } from '../../../../domain/models/LiquidKind';
import { LiquidKindApiV1 } from '../../../models/api/v1/LiquidKindApiV1';
import { LiquidInsertQueryApiV1 } from '../../../queries/api/v1/LiquidInsertQueryApiV1';
import { LiquidInsertQuery } from '../../../queries/LiquidInsertQuery';

@Injectable()
export class LiquidInsertQueryApiV1ToLiquidInsertQueryConverter
  implements Converter<LiquidInsertQueryApiV1, LiquidInsertQuery>
{
  readonly #liquidKindApiV1ToLiquidKindConverter: Converter<
    LiquidKindApiV1,
    LiquidKind
  >;

  constructor(
    @Inject(drinksInjectionSymbolsMap.liquidKindApiV1ToLiquidKindConverter)
    liquidKindApiV1ToLiquidKindConverter: Converter<
      LiquidKindApiV1,
      LiquidKind
    >,
  ) {
    this.#liquidKindApiV1ToLiquidKindConverter =
      liquidKindApiV1ToLiquidKindConverter;
  }

  public convert(
    liquidInsertQueryApiV1: LiquidInsertQueryApiV1,
  ): LiquidInsertQuery {
    return {
      kind: this.#liquidKindApiV1ToLiquidKindConverter.convert(
        liquidInsertQueryApiV1.kind,
      ),
      name: liquidInsertQueryApiV1.name,
    };
  }
}
