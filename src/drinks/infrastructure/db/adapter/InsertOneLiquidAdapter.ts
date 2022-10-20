import { Inject, Injectable } from '@nestjs/common';

import { Converter } from '../../../../common/domain/modules/Converter';
import { InsertOneEntityMemoryAdapter } from '../../../../db/infrastructure/memory/adapters/InsertOneEntityMemoryAdapter';
import { InsertQuery } from '../../../../db/infrastructure/memory/service/BaseEntityMemoryPersistenceService';
import { UuidBasedEntityMemoryPersistenceService } from '../../../../db/infrastructure/memory/service/UuidBasedEntityMemoryPersistenceService';
import { LiquidInsertQuery } from '../../../application/queries/LiquidInsertQuery';
import { drinksInjectionSymbolsMap } from '../../../domain/injection/drinksInjectionSymbolsMap';
import { Liquid } from '../../../domain/models/Liquid';
import { LiquidDb } from '../models/LiquidDb';

@Injectable()
export class InsertOneLiquidAdapter extends InsertOneEntityMemoryAdapter<
  LiquidInsertQuery,
  Liquid,
  LiquidDb
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @Inject(drinksInjectionSymbolsMap.liquidDbToLiquidConverter)
    liquidDbToLiquidConverter: Converter<LiquidDb, Liquid>,
    @Inject(
      drinksInjectionSymbolsMap.liquidInsertQueryToLiquidMemoryInsertQueryConverter,
    )
    liquidInsertQueryToLiquidMemoryInsertQueryConverter: Converter<
      LiquidInsertQuery,
      InsertQuery<LiquidDb>
    >,
    @Inject(drinksInjectionSymbolsMap.liquidMemoryPersistenceService)
    liquidMemoryPersistenceService: UuidBasedEntityMemoryPersistenceService<LiquidDb>,
  ) {
    super(
      liquidDbToLiquidConverter,
      liquidInsertQueryToLiquidMemoryInsertQueryConverter,
      liquidMemoryPersistenceService,
    );
  }
}
