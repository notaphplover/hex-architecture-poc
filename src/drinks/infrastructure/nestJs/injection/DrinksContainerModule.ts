import { Module } from '@nestjs/common';

import { CosmosDbSqlContainerName } from '../../../../db/infrastructure/cosmosDbSql/models/CosmosDbSqlContainerName';
import { CosmosDbSqlDatabaseAlias } from '../../../../db/infrastructure/cosmosDbSql/models/CosmosDbSqlDatabaseAlias';
import { UuidBasedEntityMemoryPersistenceService } from '../../../../db/infrastructure/memory/service/UuidBasedEntityMemoryPersistenceService';
import { CosmosSqlContainerModule } from '../../../../db/infrastructure/nestJs/injection/CosmosSqlContainerModule';
import { DbContainerModule } from '../../../../db/infrastructure/nestJs/injection/DbContainerModule';
import { ErrorsContainerModule } from '../../../../errors/infrastructure/nestJs/ErrorsContainerModule';
import { HttpContainerModule } from '../../../../http/infrastructure/nestJs/HttpContainerModule';
import { FindOneLiquidHandler } from '../../../application/handlers/FindOneLiquidHandler';
import { InsertOneLiquidHandler } from '../../../application/handlers/InsertOneLiquidHandler';
import { drinksInjectionSymbolsMap } from '../../../domain/injection/drinksInjectionSymbolsMap';
import { Drink } from '../../../domain/models/Drink';
import { LiquidFindQueryApiV1ToLiquidFindQueryConverter } from '../../api/v1/converters/LiquidFindQueryApiV1ToLiquidFindQueryConverter';
import { LiquidInsertQueryApiV1ToLiquidInsertQueryConverter } from '../../api/v1/converters/LiquidInsertQueryApiV1ToLiquidInsertQueryConverter';
import { LiquidKindApiV1ToLiquidKindConverter } from '../../api/v1/converters/LiquidKindApiV1ToLiquidKindConverter';
import { LiquidKindToLiquidKindApiV1Converter } from '../../api/v1/converters/LiquidKindToLiquidKindApiV1Converter';
import { LiquidToLiquidApiV1Converter } from '../../api/v1/converters/LiquidToLiquidApiV1Converter';
import { AzureGetLiquidApiV1HttpRequestController } from '../../azure/infrastructure/AzureGetLiquidApiV1HttpRequestController';
import { AzurePostLiquidApiV1HttpRequestController } from '../../azure/infrastructure/AzurePostLiquidApiV1HttpRequestController';
import { GetLiquidApiV1HttpRequestProcessor } from '../../azure/infrastructure/GetLiquidApiV1HttpRequestProcessor';
import { PostLiquidApiV1HttpRequestProcessor } from '../../azure/infrastructure/PostLiquidApiV1HttpRequestProcessor';
import { FindOneLiquidCosmosDbSqlAdapter } from '../../cosmosDbSql/adapters/FindOneLiquidCosmosDbSqlAdapter';
import { InsertOneLiquidCosmosDbAdapter } from '../../cosmosDbSql/adapters/InsertOneLiquidCosmosDbSqlAdapter';
import { LiquidCosmosDbSqlToLiquidConverter } from '../../cosmosDbSql/converters/LiquidCosmosDbSqlToLiquidConverter';
import { LiquidFindQueryToLiquidCosmosDbSqlFindOneQueryConverter } from '../../cosmosDbSql/converters/LiquidFindQueryToLiquidCosmosDbSqlFindOneQueryConverter';
import { LiquidInsertQueryToLiquidCosmosDbSqlInsertQueryConverter } from '../../cosmosDbSql/converters/LiquidInsertQueryToLiquidCosmosDbSqlInsertQueryConverter';
import { LiquidKindCosmosDbSqlToLiquidKindConverter } from '../../cosmosDbSql/converters/LiquidKindCosmosDbSqlToLiquidKindConverter';
import { LiquidKindToLiquidKindCosmosDbSqlConverter } from '../../cosmosDbSql/converters/LiquidKindToLiquidKindCosmosDbSqlConverter';
import { LiquidDbToLiquidConverter } from '../../db/converter/LiquidDbToLiquidConverter';
import { LiquidFindQueryToLiquidMemoryFindOneQueryConverter } from '../../db/converter/LiquidFindQueryToLiquidMemoryFindOneQueryConverter';
import { LiquidInsertQueryToLiquidMemoryInsertQueryConverter } from '../../db/converter/LiquidInsertQueryToLiquidMemoryInsertQueryConverter';
import { LiquidKindDbToLiquidKindConverter } from '../../db/converter/LiquidKindDbToLiquidKindConverter';
import { LiquidKindToLiquidKindDbConverter } from '../../db/converter/LiquidKindToLiquidKindDbConverter';
import { LiquidDb } from '../../db/models/LiquidDb';

@Module({
  exports: [
    drinksInjectionSymbolsMap.getLiquidApiV1HttpRequestController,
    drinksInjectionSymbolsMap.postLiquidApiV1HttpRequestController,
  ],
  imports: [
    CosmosSqlContainerModule.forDb(CosmosDbSqlDatabaseAlias.db, [
      CosmosDbSqlContainerName.liquids,
    ]),
    DbContainerModule,
    ErrorsContainerModule,
    HttpContainerModule,
  ],
  providers: [
    {
      provide: drinksInjectionSymbolsMap.drinkMemoryPersistenceService,
      useValue: new UuidBasedEntityMemoryPersistenceService<Drink>(),
    },
    {
      provide: drinksInjectionSymbolsMap.findOneLiquidAdapter,
      useClass: FindOneLiquidCosmosDbSqlAdapter,
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
      useClass: InsertOneLiquidCosmosDbAdapter,
    },
    {
      provide: drinksInjectionSymbolsMap.liquidCosmosDbSqlToLiquidConverter,
      useClass: LiquidCosmosDbSqlToLiquidConverter,
    },
    {
      provide: drinksInjectionSymbolsMap.liquidDbToLiquidConverter,
      useClass: LiquidDbToLiquidConverter,
    },
    {
      provide:
        drinksInjectionSymbolsMap.liquidFindQueryApiV1ToLiquidFindQueryConverter,
      useClass: LiquidFindQueryApiV1ToLiquidFindQueryConverter,
    },
    {
      provide:
        drinksInjectionSymbolsMap.liquidFindQueryToLiquidCosmosDbSqlFindOneQueryConverter,
      useClass: LiquidFindQueryToLiquidCosmosDbSqlFindOneQueryConverter,
    },
    {
      provide:
        drinksInjectionSymbolsMap.liquidFindQueryToLiquidMemoryFindOneQueryConverter,
      useClass: LiquidFindQueryToLiquidMemoryFindOneQueryConverter,
    },
    {
      provide:
        drinksInjectionSymbolsMap.liquidInsertQueryApiV1ToLiquidInsertQueryConverter,
      useClass: LiquidInsertQueryApiV1ToLiquidInsertQueryConverter,
    },
    {
      provide:
        drinksInjectionSymbolsMap.liquidInsertQueryToLiquidCosmosDbSqlInsertQueryConverter,
      useClass: LiquidInsertQueryToLiquidCosmosDbSqlInsertQueryConverter,
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
      provide:
        drinksInjectionSymbolsMap.liquidKindCosmosDbSqlToLiquidKindConverter,
      useClass: LiquidKindCosmosDbSqlToLiquidKindConverter,
    },
    {
      provide: drinksInjectionSymbolsMap.liquidKindDbToLiquidKindConverter,
      useClass: LiquidKindDbToLiquidKindConverter,
    },
    {
      provide: drinksInjectionSymbolsMap.liquidKindToLiquidKindApiV1Converter,
      useClass: LiquidKindToLiquidKindApiV1Converter,
    },
    {
      provide:
        drinksInjectionSymbolsMap.liquidKindToLiquidKindCosmosDbSqlConverter,
      useClass: LiquidKindToLiquidKindCosmosDbSqlConverter,
    },
    {
      provide: drinksInjectionSymbolsMap.liquidKindToLiquidKindDbConverter,
      useClass: LiquidKindToLiquidKindDbConverter,
    },
    {
      provide: drinksInjectionSymbolsMap.liquidMemoryPersistenceService,
      useValue: new UuidBasedEntityMemoryPersistenceService<LiquidDb>(),
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
