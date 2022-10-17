import { Injectable } from '@nestjs/common';

import { Converter } from '../../../../common/domain/modules/Converter';
import { LiquidFindQuery } from '../../../application/queries/LiquidFindQuery';

@Injectable()
export class LiquidFindQueryToLiquidMemoryFindQueryConverter
  implements Converter<LiquidFindQuery, string>
{
  public convert(liquidFindQuery: LiquidFindQuery): string {
    return liquidFindQuery.id;
  }
}
