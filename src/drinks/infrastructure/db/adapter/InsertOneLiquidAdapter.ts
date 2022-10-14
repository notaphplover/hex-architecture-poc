import { Inject, Injectable } from '@nestjs/common';

import { Converter } from '../../../../common/domain/modules/Converter';
import { InsertOneEntityPort } from '../../../../db/application/ports/InsertOneEntityPort';
import { InsertOneEntityMemoryAdapter } from '../../../../db/infrastructure/memory/adapters/InsertOneEntityMemoryAdapter';
import { InsertQuery } from '../../../../db/infrastructure/memory/service/BaseEntityMemoryPersistenceService';
import { UuidBasedEntityMemoryPersistenceService } from '../../../../db/infrastructure/memory/service/UuidBasedEntityMemoryPersistenceService';
import { LiquidInsertQuery } from '../../../application/queries/LiquidInsertQuery';
import { drinksInjectionSymbolsMap } from '../../../domain/injection/drinksInjectionSymbolsMap';
import { Liquid } from '../../../domain/models/Liquid';

@Injectable()
export class InsertOneLiquidAdapter
  extends InsertOneEntityMemoryAdapter<LiquidInsertQuery, Liquid>
  implements InsertOneEntityPort<LiquidInsertQuery, Liquid>
{
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @Inject(
      drinksInjectionSymbolsMap.liquidInsertQueryToLiquidMemoryInsertQueryConverter,
    )
    liquidInsertQueryToLiquidMemoryInsertQueryConverter: Converter<
      LiquidInsertQuery,
      InsertQuery<Liquid>
    >,
    @Inject(drinksInjectionSymbolsMap.liquidMemoryPersistenceService)
    liquidMemoryPersistenceService: UuidBasedEntityMemoryPersistenceService<Liquid>,
  ) {
    super(
      liquidInsertQueryToLiquidMemoryInsertQueryConverter,
      liquidMemoryPersistenceService,
    );
  }
}
