import { Injectable } from '@nestjs/common';

import { Converter } from '../../../../../common/domain/modules/Converter';
import { LiquidFindQueryApiV1 } from '../../../queries/api/v1/LiquidFindQueryApiV1';
import { LiquidFindQuery } from '../../../queries/LiquidFindQuery';

@Injectable()
export class LiquidFindQueryApiV1ToLiquidFindQueryConverter
  implements Converter<LiquidFindQueryApiV1, LiquidFindQuery>
{
  public convert(liquidFindQueryApiV1: LiquidFindQueryApiV1): LiquidFindQuery {
    return {
      ids: [liquidFindQueryApiV1.id],
    };
  }
}
