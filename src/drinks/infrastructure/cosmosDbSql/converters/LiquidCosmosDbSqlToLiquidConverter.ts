import { Inject, Injectable } from '@nestjs/common';

import { Converter } from '../../../../common/domain/modules/Converter';
import { drinksInjectionSymbolsMap } from '../../../domain/injection/drinksInjectionSymbolsMap';
import { Liquid } from '../../../domain/models/Liquid';
import { LiquidKind } from '../../../domain/models/LiquidKind';
import { LiquidCosmosDbSql } from '../models/LiquidCosmosDbSql';
import { LiquidKindCosmosDbSql } from '../models/LiquidKindCosmosDbSql';

@Injectable()
export class LiquidCosmosDbSqlToLiquidConverter
  implements Converter<LiquidCosmosDbSql, Liquid>
{
  readonly #liquidKindCosmosDbSqlToLiquidKindConverter: Converter<
    LiquidKindCosmosDbSql,
    LiquidKind
  >;
  constructor(
    @Inject(
      drinksInjectionSymbolsMap.liquidKindCosmosDbSqlToLiquidKindConverter,
    )
    liquidKindDbToLiquidKindConverter: Converter<
      LiquidKindCosmosDbSql,
      LiquidKind
    >,
  ) {
    this.#liquidKindCosmosDbSqlToLiquidKindConverter =
      liquidKindDbToLiquidKindConverter;
  }

  public convert(limitDb: LiquidCosmosDbSql): Liquid {
    return {
      id: limitDb.id,
      kind: this.#liquidKindCosmosDbSqlToLiquidKindConverter.convert(
        limitDb.kind,
      ),
      name: limitDb.name,
    };
  }
}
