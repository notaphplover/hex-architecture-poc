import { Module } from '@nestjs/common';

import { UuidBasedEntityMemoryPersistenceService } from '../../../../db/infrastructure/memory/service/UuidBasedEntityMemoryPersistenceService';
import { InsertOneLiquidHandler } from '../../../application/handlers/InsertOneLiquidHandler';
import { drinksInjectionSymbolsMap } from '../../../domain/injection/drinksInjectionSymbolsMap';
import { Liquid } from '../../../domain/models/Liquid';
import { InsertOneLiquidAdapter } from '../../db/adapter/InsertOneLiquidAdapter';
import { LiquidInsertQueryToLiquidMemoryInsertQueryConverter } from '../../db/converter/LiquidInsertQueryToLiquidMemoryInsertQueryConverter';

@Module({
  exports: [drinksInjectionSymbolsMap.insertOneLiquidHandler],
  providers: [
    {
      provide: drinksInjectionSymbolsMap.insertOneLiquidHandler,
      useClass: InsertOneLiquidHandler,
    },
    {
      provide: drinksInjectionSymbolsMap.insertOneLiquidAdapter,
      useClass: InsertOneLiquidAdapter,
    },
    {
      provide:
        drinksInjectionSymbolsMap.liquidInsertQueryToLiquidMemoryInsertQueryConverter,
      useClass: LiquidInsertQueryToLiquidMemoryInsertQueryConverter,
    },
    {
      provide: drinksInjectionSymbolsMap.liquidMemoryPersistenceService,
      useValue: new UuidBasedEntityMemoryPersistenceService<Liquid>(),
    },
  ],
})
export class DrinksContainerModule {}
