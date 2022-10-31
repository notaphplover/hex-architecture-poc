import { Injectable } from '@nestjs/common';

import { Converter } from '../../../../common/domain/modules/Converter';
import { LiquidKind } from '../../../domain/models/LiquidKind';
import { LiquidKindCosmosDbSql } from '../models/LiquidKindCosmosDbSql';

const liquidKindCosmosDbSqlToLiquidKindMap: {
  [TKey in LiquidKindCosmosDbSql]: LiquidKind;
} = Object.freeze({
  [LiquidKindCosmosDbSql.alcohol]: LiquidKind.alcohol,
  [LiquidKindCosmosDbSql.soda]: LiquidKind.soda,
});

@Injectable()
export class LiquidKindCosmosDbSqlToLiquidKindConverter
  implements Converter<LiquidKindCosmosDbSql, LiquidKind>
{
  public convert(liquidKindDb: LiquidKindCosmosDbSql): LiquidKind {
    return liquidKindCosmosDbSqlToLiquidKindMap[liquidKindDb];
  }
}
