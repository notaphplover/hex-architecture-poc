import { Module } from '@nestjs/common';

import { CosmosDbSqlContainerName } from '../../../../db/infrastructure/cosmosDbSql/models/CosmosDbSqlContainerName';
import { CosmosDbSqlDatabaseAlias } from '../../../../db/infrastructure/cosmosDbSql/models/CosmosDbSqlDatabaseAlias';
import { CosmosSqlContainerModule } from '../../../../db/infrastructure/nestJs/injection/CosmosSqlContainerModule';
import { DbContainerModule } from '../../../../db/infrastructure/nestJs/injection/DbContainerModule';
import { ErrorsContainerModule } from '../../../../errors/infrastructure/nestJs/ErrorsContainerModule';
import { HttpContainerModule } from '../../../../http/infrastructure/nestJs/HttpContainerModule';
import { FindOneLiquidHandler } from '../../../application/handlers/FindOneLiquidHandler';
import { InsertOneDrinkHandler } from '../../../application/handlers/InsertOneDrinkHandler';
import { InsertOneLiquidHandler } from '../../../application/handlers/InsertOneLiquidHandler';
import { drinksInjectionSymbolsMap } from '../../../domain/injection/drinksInjectionSymbolsMap';
import { DrinkInsertQueryApiV1ToDrinkInsertQueryConverter } from '../../api/v1/converters/DrinkInsertQueryApiV1ToDrinkInsertQueryConverter';
import { DrinkItemApiV1ToDrinkItemConverter } from '../../api/v1/converters/DrinkItemApiV1ToDrinkItemConverter';
import { DrinkItemToDrinkItemApiV1Converter } from '../../api/v1/converters/DrinkItemToDrinkItemApiV1Converter';
import { DrinkKindApiV1ToDrinkKindConverter } from '../../api/v1/converters/DrinkKindApiV1ToDrinkKindConverter';
import { DrinkKindToDrinkKindApiV1Converter } from '../../api/v1/converters/DrinkKindToDrinkKindApiV1Converter';
import { DrinkToDrinkApiV1Converter } from '../../api/v1/converters/DrinkToDrinkApiV1Converter';
import { LiquidFindQueryApiV1ToLiquidFindQueryConverter } from '../../api/v1/converters/LiquidFindQueryApiV1ToLiquidFindQueryConverter';
import { LiquidInsertQueryApiV1ToLiquidInsertQueryConverter } from '../../api/v1/converters/LiquidInsertQueryApiV1ToLiquidInsertQueryConverter';
import { LiquidKindApiV1ToLiquidKindConverter } from '../../api/v1/converters/LiquidKindApiV1ToLiquidKindConverter';
import { LiquidKindToLiquidKindApiV1Converter } from '../../api/v1/converters/LiquidKindToLiquidKindApiV1Converter';
import { LiquidToLiquidApiV1Converter } from '../../api/v1/converters/LiquidToLiquidApiV1Converter';
import { AzureGetLiquidApiV1HttpRequestController } from '../../azure/infrastructure/AzureGetLiquidApiV1HttpRequestController';
import { AzurePostDrinkApiV1HttpRequestController } from '../../azure/infrastructure/AzurePostDrinkApiV1HttpRequestController';
import { AzurePostLiquidApiV1HttpRequestController } from '../../azure/infrastructure/AzurePostLiquidApiV1HttpRequestController';
import { GetLiquidApiV1HttpRequestProcessor } from '../../azure/infrastructure/GetLiquidApiV1HttpRequestProcessor';
import { PostDrinkApiV1HttpRequestProcessor } from '../../azure/infrastructure/PostDrinkApiV1HttpRequestProcessor';
import { PostLiquidApiV1HttpRequestProcessor } from '../../azure/infrastructure/PostLiquidApiV1HttpRequestProcessor';
import { FindLiquidsCosmosDbSqlAdapter } from '../../cosmosDbSql/adapters/FindLiquidsCosmosDbSqlAdapter';
import { FindOneLiquidCosmosDbSqlAdapter } from '../../cosmosDbSql/adapters/FindOneLiquidCosmosDbSqlAdapter';
import { InsertOneDrinkCosmosDbSqlAdapter } from '../../cosmosDbSql/adapters/InsertOneDrinkCosmosDbSqlAdapter';
import { InsertOneLiquidCosmosDbAdapter } from '../../cosmosDbSql/adapters/InsertOneLiquidCosmosDbSqlAdapter';
import { DrinkCosmosSqlDbToDrinkConverter } from '../../cosmosDbSql/converters/DrinkCosmosSqlDbToDrinkConverter';
import { DrinkInsertQueryToDrinkCosmosDbSqlInsertQueryConverter } from '../../cosmosDbSql/converters/DrinkInsertQueryToDrinkCosmosDbSqlInsertQueryConverter';
import { DrinkItemCosmosDbSqlToDrinkItemConverter } from '../../cosmosDbSql/converters/DrinkItemCosmosDbSqlToDrinkItemConverter';
import { DrinkItemToDrinkItemCosmosDbSqlConverter } from '../../cosmosDbSql/converters/DrinkItemToDrinkItemCosmosDbSqlConverter';
import { DrinkKindCosmosDbSqlToDrinkKindConverter } from '../../cosmosDbSql/converters/DrinkKindCosmosDbSqlToDrinkKindConverter';
import { DrinkKindToDrinkKindCosmosDbSqlConverter } from '../../cosmosDbSql/converters/DrinkKindToDrinkKindCosmosDbSqlConverter';
import { LiquidCosmosDbSqlToLiquidConverter } from '../../cosmosDbSql/converters/LiquidCosmosDbSqlToLiquidConverter';
import { LiquidFindQueryToLiquidCosmosDbSqlFindOneQueryConverter } from '../../cosmosDbSql/converters/LiquidFindQueryToLiquidCosmosDbSqlFindOneQueryConverter';
import { LiquidFindQueryToLiquidCosmosDbSqlFindQueryConverter } from '../../cosmosDbSql/converters/LiquidFindQueryToLiquidCosmosDbSqlFindQueryConverter';
import { LiquidInsertQueryToLiquidCosmosDbSqlInsertQueryConverter } from '../../cosmosDbSql/converters/LiquidInsertQueryToLiquidCosmosDbSqlInsertQueryConverter';
import { LiquidKindCosmosDbSqlToLiquidKindConverter } from '../../cosmosDbSql/converters/LiquidKindCosmosDbSqlToLiquidKindConverter';
import { LiquidKindToLiquidKindCosmosDbSqlConverter } from '../../cosmosDbSql/converters/LiquidKindToLiquidKindCosmosDbSqlConverter';

@Module({
  exports: [
    drinksInjectionSymbolsMap.getLiquidApiV1HttpRequestController,
    drinksInjectionSymbolsMap.postDrinkApiV1HttpRequestController,
    drinksInjectionSymbolsMap.postLiquidApiV1HttpRequestController,
  ],
  imports: [
    CosmosSqlContainerModule.forDb(CosmosDbSqlDatabaseAlias.db, [
      CosmosDbSqlContainerName.drinks,
      CosmosDbSqlContainerName.liquids,
    ]),
    DbContainerModule,
    ErrorsContainerModule,
    HttpContainerModule,
  ],
  providers: [
    {
      provide: drinksInjectionSymbolsMap.drinkCosmosSqlDbToDrinkConverter,
      useClass: DrinkCosmosSqlDbToDrinkConverter,
    },
    {
      provide:
        drinksInjectionSymbolsMap.drinkInsertQueryApiV1ToDrinkInsertQueryConverter,
      useClass: DrinkInsertQueryApiV1ToDrinkInsertQueryConverter,
    },
    {
      provide:
        drinksInjectionSymbolsMap.drinkInsertQueryToDrinkCosmosDbSqlInsertQueryConverter,
      useClass: DrinkInsertQueryToDrinkCosmosDbSqlInsertQueryConverter,
    },
    {
      provide: drinksInjectionSymbolsMap.drinkItemApiV1ToDrinkItemConverter,
      useClass: DrinkItemApiV1ToDrinkItemConverter,
    },
    {
      provide:
        drinksInjectionSymbolsMap.drinkItemCosmosDbSqlToDrinkItemConverter,
      useClass: DrinkItemCosmosDbSqlToDrinkItemConverter,
    },
    {
      provide: drinksInjectionSymbolsMap.drinkItemToDrinkItemApiV1Converter,
      useClass: DrinkItemToDrinkItemApiV1Converter,
    },
    {
      provide:
        drinksInjectionSymbolsMap.drinkItemToDrinkItemCosmosDbSqlConverter,
      useClass: DrinkItemToDrinkItemCosmosDbSqlConverter,
    },
    {
      provide: drinksInjectionSymbolsMap.drinkKindApiV1ToDrinkKindConverter,
      useClass: DrinkKindApiV1ToDrinkKindConverter,
    },
    {
      provide:
        drinksInjectionSymbolsMap.drinkKindCosmosDbSqlToDrinkKindConverter,
      useClass: DrinkKindCosmosDbSqlToDrinkKindConverter,
    },
    {
      provide: drinksInjectionSymbolsMap.drinkKindToDrinkKindApiV1Converter,
      useClass: DrinkKindToDrinkKindApiV1Converter,
    },
    {
      provide:
        drinksInjectionSymbolsMap.drinkKindToDrinkKindCosmosDbSqlConverter,
      useClass: DrinkKindToDrinkKindCosmosDbSqlConverter,
    },
    {
      provide: drinksInjectionSymbolsMap.drinkToDrinkApiV1Converter,
      useClass: DrinkToDrinkApiV1Converter,
    },
    {
      provide: drinksInjectionSymbolsMap.findLiquidsAdapter,
      useClass: FindLiquidsCosmosDbSqlAdapter,
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
      provide: drinksInjectionSymbolsMap.insertOneDrinkAdapter,
      useClass: InsertOneDrinkCosmosDbSqlAdapter,
    },
    {
      provide: drinksInjectionSymbolsMap.insertOneDrinkHandler,
      useClass: InsertOneDrinkHandler,
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
        drinksInjectionSymbolsMap.liquidFindQueryToLiquidCosmosDbSqlFindQueryConverter,
      useClass: LiquidFindQueryToLiquidCosmosDbSqlFindQueryConverter,
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
      provide: drinksInjectionSymbolsMap.liquidKindApiV1ToLiquidKindConverter,
      useClass: LiquidKindApiV1ToLiquidKindConverter,
    },
    {
      provide:
        drinksInjectionSymbolsMap.liquidKindCosmosDbSqlToLiquidKindConverter,
      useClass: LiquidKindCosmosDbSqlToLiquidKindConverter,
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
      provide: drinksInjectionSymbolsMap.liquidToLiquidApiV1Converter,
      useClass: LiquidToLiquidApiV1Converter,
    },
    {
      provide: drinksInjectionSymbolsMap.postDrinkApiV1HttpRequestController,
      useClass: AzurePostDrinkApiV1HttpRequestController,
    },
    {
      provide: drinksInjectionSymbolsMap.postDrinkApiV1HttpRequestProcessor,
      useClass: PostDrinkApiV1HttpRequestProcessor,
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
