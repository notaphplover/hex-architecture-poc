import { Inject, Injectable } from '@nestjs/common';

import { Converter } from '../../../../common/domain/modules/Converter';
import { FindOneEntityMemoryAdapter } from '../../../../db/infrastructure/memory/adapters/FindOneEntityMemoryAdapter';
import { FindOneQuery } from '../../../../db/infrastructure/memory/service/BaseEntityMemoryPersistenceService';
import { UuidBasedEntityMemoryPersistenceService } from '../../../../db/infrastructure/memory/service/UuidBasedEntityMemoryPersistenceService';
import { LiquidFindQuery } from '../../../application/queries/LiquidFindQuery';
import { drinksInjectionSymbolsMap } from '../../../domain/injection/drinksInjectionSymbolsMap';
import { Liquid } from '../../../domain/models/Liquid';
import { LiquidDb } from '../models/LiquidDb';

@Injectable()
export class FindOneLiquidAdapter extends FindOneEntityMemoryAdapter<
  LiquidFindQuery,
  Liquid,
  LiquidDb
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @Inject(drinksInjectionSymbolsMap.liquidDbToLiquidConverter)
    liquidDbToLiquidConverter: Converter<LiquidDb, Liquid>,
    @Inject(
      drinksInjectionSymbolsMap.liquidFindQueryToLiquidMemoryFindOneQueryConverter,
    )
    liquidFindQueryToLiquidMemoryFindOneQueryConverter: Converter<
      LiquidFindQuery,
      FindOneQuery<LiquidDb>
    >,
    @Inject(drinksInjectionSymbolsMap.liquidMemoryPersistenceService)
    liquidMemoryPersistenceService: UuidBasedEntityMemoryPersistenceService<LiquidDb>,
  ) {
    super(
      liquidDbToLiquidConverter,
      liquidFindQueryToLiquidMemoryFindOneQueryConverter,
      liquidMemoryPersistenceService,
    );
  }
}
