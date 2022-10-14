import { Injectable } from '@nestjs/common';

import { Converter } from '../../../../../common/domain/modules/Converter';
import { LiquidKind } from '../../../../domain/models/LiquidKind';
import { LiquidKindApiV1 } from '../models/LiquidKindApiV1';

const liquidKindToLiquidKindApiV1Map: {
  [TKey in LiquidKind]: LiquidKindApiV1;
} = {
  [LiquidKind.alcohol]: LiquidKindApiV1.alcohol,
  [LiquidKind.soda]: LiquidKindApiV1.soda,
};

@Injectable()
export class LiquidKindToLiquidKindApiV1Converter
  implements Converter<LiquidKind, LiquidKindApiV1>
{
  public convert(liquidKind: LiquidKind): LiquidKindApiV1 {
    return liquidKindToLiquidKindApiV1Map[liquidKind];
  }
}
