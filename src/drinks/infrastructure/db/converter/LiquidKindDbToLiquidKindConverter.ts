import { Injectable } from '@nestjs/common';

import { Converter } from '../../../../common/domain/modules/Converter';
import { LiquidKind } from '../../../domain/models/LiquidKind';
import { LiquidKindDb } from '../models/LiquidKindDb';

const liquidKindDbToLiquidKindMap: { [TKey in LiquidKindDb]: LiquidKind } =
  Object.freeze({
    [LiquidKindDb.alcohol]: LiquidKind.alcohol,
    [LiquidKindDb.soda]: LiquidKind.soda,
  });

@Injectable()
export class LiquidKindDbToLiquidKindConverter
  implements Converter<LiquidKindDb, LiquidKind>
{
  public convert(liquidKindDb: LiquidKindDb): LiquidKind {
    return liquidKindDbToLiquidKindMap[liquidKindDb];
  }
}
