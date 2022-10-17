import { Module } from '@nestjs/common';

import { UuidBasedEntityMemoryPersistenceService } from '../../../../db/infrastructure/memory/service/UuidBasedEntityMemoryPersistenceService';
import { ErrorsContainerModule } from '../../../../errors/infrastructure/nestJs/ErrorsContainerModule';
import { HttpContainerModule } from '../../../../http/infrastructure/nestJs/HttpContainerModule';
import { FindOneLiquidHandler } from '../../../application/handlers/FindOneLiquidHandler';
import { InsertOneLiquidHandler } from '../../../application/handlers/InsertOneLiquidHandler';
import { drinksInjectionSymbolsMap } from '../../../domain/injection/drinksInjectionSymbolsMap';
import { Liquid } from '../../../domain/models/Liquid';
import { LiquidFindQueryApiV1ToLiquidFindQueryConverter } from '../../api/v1/converters/LiquidFindQueryApiV1ToLiquidFindQueryConverter';
import { LiquidInsertQueryApiV1ToLiquidInsertQueryConverter } from '../../api/v1/converters/LiquidInsertQueryApiV1ToLiquidInsertQueryConverter';
import { LiquidKindApiV1ToLiquidKindConverter } from '../../api/v1/converters/LiquidKindApiV1ToLiquidKindConverter';
import { LiquidKindToLiquidKindApiV1Converter } from '../../api/v1/converters/LiquidKindToLiquidKindApiV1Converter';
import { LiquidToLiquidApiV1Converter } from '../../api/v1/converters/LiquidToLiquidApiV1Converter';
import { AzureGetLiquidApiV1HttpRequestController } from '../../azure/infrastructure/AzureGetLiquidApiV1HttpRequestController';
import { AzurePostLiquidApiV1HttpRequestController } from '../../azure/infrastructure/AzurePostLiquidApiV1HttpRequestController';
import { GetLiquidApiV1HttpRequestProcessor } from '../../azure/infrastructure/GetLiquidApiV1HttpRequestProcessor';
import { PostLiquidApiV1HttpRequestProcessor } from '../../azure/infrastructure/PostLiquidApiV1HttpRequestProcessor';
import { FindOneLiquidAdapter } from '../../db/adapter/FindOneLiquidAdapter';
import { InsertOneLiquidAdapter } from '../../db/adapter/InsertOneLiquidAdapter';
import { LiquidFindQueryToLiquidMemoryFindQueryConverter } from '../../db/converter/LiquidFindQueryToLiquidMemoryFindQueryConverter';
import { LiquidInsertQueryToLiquidMemoryInsertQueryConverter } from '../../db/converter/LiquidInsertQueryToLiquidMemoryInsertQueryConverter';

@Module({
  exports: [
    drinksInjectionSymbolsMap.getLiquidApiV1HttpRequestController,
    drinksInjectionSymbolsMap.postLiquidApiV1HttpRequestController,
  ],
  imports: [ErrorsContainerModule, HttpContainerModule],
  providers: [
    {
      provide: drinksInjectionSymbolsMap.findOneLiquidAdapter,
      useClass: FindOneLiquidAdapter,
    },
    {
      provide: drinksInjectionSymbolsMap.findOneLiquidHandler,
      useClass: FindOneLiquidHandler,
    },
    {
      provide: drinksInjectionSymbolsMap.getLiquidApiV1HttpRequestController,
      useClass: AzureGetLiquidApiV1HttpRequestController,
    },
    {
      provide: drinksInjectionSymbolsMap.getLiquidApiV1HttpRequestProcessor,
      useClass: GetLiquidApiV1HttpRequestProcessor,
    },
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
        drinksInjectionSymbolsMap.liquidFindQueryApiV1ToLiquidFindQueryConverter,
      useClass: LiquidFindQueryApiV1ToLiquidFindQueryConverter,
    },
    {
      provide:
        drinksInjectionSymbolsMap.liquidFindQueryToLiquidMemoryFindQueryConverter,
      useClass: LiquidFindQueryToLiquidMemoryFindQueryConverter,
    },
    {
      provide:
        drinksInjectionSymbolsMap.liquidInsertQueryApiV1ToLiquidInsertQueryConverter,
      useClass: LiquidInsertQueryApiV1ToLiquidInsertQueryConverter,
    },
    {
      provide:
        drinksInjectionSymbolsMap.liquidInsertQueryToLiquidMemoryInsertQueryConverter,
      useClass: LiquidInsertQueryToLiquidMemoryInsertQueryConverter,
    },
    {
      provide: drinksInjectionSymbolsMap.liquidKindApiV1ToLiquidKindConverter,
      useClass: LiquidKindApiV1ToLiquidKindConverter,
    },
    {
      provide: drinksInjectionSymbolsMap.liquidKindToLiquidKindApiV1Converter,
      useClass: LiquidKindToLiquidKindApiV1Converter,
    },
    {
      provide: drinksInjectionSymbolsMap.liquidMemoryPersistenceService,
      useValue: new UuidBasedEntityMemoryPersistenceService<Liquid>(),
    },
    {
      provide: drinksInjectionSymbolsMap.liquidToLiquidApiV1Converter,
      useClass: LiquidToLiquidApiV1Converter,
    },
    {
      provide: drinksInjectionSymbolsMap.postLiquidApiV1HttpRequestController,
      useClass: AzurePostLiquidApiV1HttpRequestController,
    },
    {
      provide: drinksInjectionSymbolsMap.postLiquidApiV1HttpRequestProcessor,
      useClass: PostLiquidApiV1HttpRequestProcessor,
    },
  ],
})
export class DrinksContainerModule {}
