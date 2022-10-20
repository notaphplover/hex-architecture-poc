import { Injectable } from '@nestjs/common';

import { Converter } from '../../../../common/domain/modules/Converter';
import { LiquidKind } from '../../../domain/models/LiquidKind';
import { LiquidKindDb } from '../models/LiquidKindDb';

const liquidKindToLiquidKindDbMap: { [TKey in LiquidKind]: LiquidKindDb } =
  Object.freeze({
    [LiquidKind.alcohol]: LiquidKindDb.alcohol,
    [LiquidKind.soda]: LiquidKindDb.soda,
  });

@Injectable()
export class LiquidKindToLiquidKindDbConverter
  implements Converter<LiquidKind, LiquidKindDb>
{
  public convert(liquidKindDb: LiquidKind): LiquidKindDb {
    return liquidKindToLiquidKindDbMap[liquidKindDb];
  }
}
