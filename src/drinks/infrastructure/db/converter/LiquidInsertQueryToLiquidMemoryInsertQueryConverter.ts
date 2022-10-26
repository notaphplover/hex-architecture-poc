import { Inject, Injectable } from '@nestjs/common';

import { Converter } from '../../../../common/domain/modules/Converter';
import { InsertQuery } from '../../../../db/infrastructure/memory/models/InsertQuery';
import { LiquidInsertQuery } from '../../../application/queries/LiquidInsertQuery';
import { drinksInjectionSymbolsMap } from '../../../domain/injection/drinksInjectionSymbolsMap';
import { LiquidKind } from '../../../domain/models/LiquidKind';
import { LiquidDb } from '../models/LiquidDb';
import { LiquidKindDb } from '../models/LiquidKindDb';

@Injectable()
export class LiquidInsertQueryToLiquidMemoryInsertQueryConverter
  implements Converter<LiquidInsertQuery, InsertQuery<LiquidDb>>
{
  readonly #liquidKindToLiquidKindDbConverter: Converter<
    LiquidKind,
    LiquidKindDb
  >;

  constructor(
    @Inject(drinksInjectionSymbolsMap.liquidKindToLiquidKindDbConverter)
    liquidKindToLiquidKindDbConverter: Converter<LiquidKind, LiquidKindDb>,
  ) {
    this.#liquidKindToLiquidKindDbConverter = liquidKindToLiquidKindDbConverter;
  }

  public convert(input: LiquidInsertQuery): InsertQuery<LiquidDb> {
    return {
      kind: this.#liquidKindToLiquidKindDbConverter.convert(input.kind),
      name: input.name,
    };
  }
}
