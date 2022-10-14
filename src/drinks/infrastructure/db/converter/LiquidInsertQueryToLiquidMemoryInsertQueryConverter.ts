import { Injectable } from '@nestjs/common';

import { Converter } from '../../../../common/domain/modules/Converter';
import { InsertQuery } from '../../../../db/infrastructure/memory/service/BaseEntityMemoryPersistenceService';
import { LiquidInsertQuery } from '../../../application/queries/LiquidInsertQuery';
import { Liquid } from '../../../domain/models/Liquid';

@Injectable()
export class LiquidInsertQueryToLiquidMemoryInsertQueryConverter
  implements Converter<LiquidInsertQuery, InsertQuery<Liquid>>
{
  public convert(input: LiquidInsertQuery): InsertQuery<Liquid> {
    return {
      kind: input.kind,
      name: input.name,
    };
  }
}
