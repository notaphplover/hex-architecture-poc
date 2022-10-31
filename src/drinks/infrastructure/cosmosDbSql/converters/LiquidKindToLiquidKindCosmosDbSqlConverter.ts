import { Injectable } from '@nestjs/common';

import { Converter } from '../../../../common/domain/modules/Converter';
import { LiquidKind } from '../../../domain/models/LiquidKind';
import { LiquidKindCosmosDbSql } from '../models/LiquidKindCosmosDbSql';

const liquidKindToLiquidKindCosmosDbSqlMap: {
  [TKey in LiquidKind]: LiquidKindCosmosDbSql;
} = Object.freeze({
  [LiquidKind.alcohol]: LiquidKindCosmosDbSql.alcohol,
  [LiquidKind.soda]: LiquidKindCosmosDbSql.soda,
});

@Injectable()
export class LiquidKindToLiquidKindCosmosDbSqlConverter
  implements Converter<LiquidKind, LiquidKindCosmosDbSql>
{
  public convert(liquidKindDb: LiquidKind): LiquidKindCosmosDbSql {
    return liquidKindToLiquidKindCosmosDbSqlMap[liquidKindDb];
  }
}
