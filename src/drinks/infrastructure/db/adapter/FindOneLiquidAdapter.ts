import { Inject, Injectable } from '@nestjs/common';

import { Converter } from '../../../../common/domain/modules/Converter';
import { FindOneEntityMemoryAdapter } from '../../../../db/infrastructure/memory/adapters/FindOneEntityMemoryAdapter';
import { UuidBasedEntityMemoryPersistenceService } from '../../../../db/infrastructure/memory/service/UuidBasedEntityMemoryPersistenceService';
import { LiquidFindQuery } from '../../../application/queries/LiquidFindQuery';
import { drinksInjectionSymbolsMap } from '../../../domain/injection/drinksInjectionSymbolsMap';
import { Liquid } from '../../../domain/models/Liquid';

@Injectable()
export class FindOneLiquidAdapter extends FindOneEntityMemoryAdapter<
  LiquidFindQuery,
  Liquid
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @Inject(
      drinksInjectionSymbolsMap.liquidFindQueryToLiquidMemoryFindQueryConverter,
    )
    liquidFindQueryToLiquidMemoryFindQueryConverter: Converter<
      LiquidFindQuery,
      string
    >,
    @Inject(drinksInjectionSymbolsMap.liquidMemoryPersistenceService)
    liquidMemoryPersistenceService: UuidBasedEntityMemoryPersistenceService<Liquid>,
  ) {
    super(
      liquidFindQueryToLiquidMemoryFindQueryConverter,
      liquidMemoryPersistenceService,
    );
  }
}
