import { Injectable } from '@nestjs/common';

import { Converter } from '../../../../../common/domain/modules/Converter';
import { LiquidFindQuery } from '../../../../application/queries/LiquidFindQuery';
import { LiquidFindQueryApiV1 } from '../queries/LiquidFindQueryApiV1';

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
