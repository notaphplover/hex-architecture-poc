import { Injectable } from '@nestjs/common';

import { Converter } from '../../../../../common/domain/modules/Converter';
import { LiquidKind } from '../../../../domain/models/LiquidKind';
import { LiquidKindApiV1 } from '../models/LiquidKindApiV1';

const liquidKindApiV1ToLiquidKindMap: {
  [TKey in LiquidKindApiV1]: LiquidKind;
} = {
  [LiquidKindApiV1.alcohol]: LiquidKind.alcohol,
  [LiquidKindApiV1.soda]: LiquidKind.soda,
};

@Injectable()
export class LiquidKindApiV1ToLiquidKindConverter
  implements Converter<LiquidKindApiV1, LiquidKind>
{
  public convert(liquidKindApiV1: LiquidKindApiV1): LiquidKind {
    return liquidKindApiV1ToLiquidKindMap[liquidKindApiV1];
  }
}
