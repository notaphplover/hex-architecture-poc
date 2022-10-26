import { Injectable } from '@nestjs/common';

import { Converter } from '../../../../common/domain/modules/Converter';
import { FindOneQuery } from '../../../../db/infrastructure/memory/models/FindOneQuery';
import { LiquidFindQuery } from '../../../application/queries/LiquidFindQuery';
import { LiquidDb } from '../models/LiquidDb';

@Injectable()
export class LiquidFindQueryToLiquidMemoryFindOneQueryConverter
  implements Converter<LiquidFindQuery, FindOneQuery<LiquidDb>>
{
  public convert(liquidFindQuery: LiquidFindQuery): FindOneQuery<LiquidDb> {
    return {
      filters: { id: liquidFindQuery.id },
    };
  }
}
