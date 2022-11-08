import { Module } from '@nestjs/common';

import { CosmosDbSqlContainerName } from '../../../../db/infrastructure/cosmosDbSql/models/CosmosDbSqlContainerName';
import { CosmosDbSqlDatabaseAlias } from '../../../../db/infrastructure/cosmosDbSql/models/CosmosDbSqlDatabaseAlias';
import { CosmosSqlContainerModule } from '../../../../db/infrastructure/nestJs/injection/CosmosSqlContainerModule';
import { DbContainerModule } from '../../../../db/infrastructure/nestJs/injection/DbContainerModule';
import { ErrorsContainerModule } from '../../../../errors/infrastructure/nestJs/ErrorsContainerModule';
import { HttpContainerModule } from '../../../../http/infrastructure/nestJs/HttpContainerModule';
import { GetDrinkApiV1RequestController } from '../../../application/controllers/GetDrinkApiV1RequestController';
import { GetLiquidApiV1RequestController } from '../../../application/controllers/GetLiquidApiV1RequestController';
import { PostDrinkApiV1RequestController } from '../../../application/controllers/PostDrinkApiV1RequestController';
import { PostLiquidApiV1RequestController } from '../../../application/controllers/PostLiquidApiV1RequestController';
import { DrinkFindQueryApiV1ToDrinkFindQueryConverter } from '../../../application/converters/api/v1/DrinkFindQueryApiV1ToDrinkFindQueryConverter';
import { DrinkInsertQueryApiV1ToDrinkInsertQueryConverter } from '../../../application/converters/api/v1/DrinkInsertQueryApiV1ToDrinkInsertQueryConverter';
import { DrinkItemApiV1ToDrinkItemConverter } from '../../../application/converters/api/v1/DrinkItemApiV1ToDrinkItemConverter';
import { DrinkItemToDrinkItemApiV1Converter } from '../../../application/converters/api/v1/DrinkItemToDrinkItemApiV1Converter';
import { DrinkKindApiV1ToDrinkKindConverter } from '../../../application/converters/api/v1/DrinkKindApiV1ToDrinkKindConverter';
import { DrinkKindToDrinkKindApiV1Converter } from '../../../application/converters/api/v1/DrinkKindToDrinkKindApiV1Converter';
import { DrinkToDrinkApiV1Converter } from '../../../application/converters/api/v1/DrinkToDrinkApiV1Converter';
import { LiquidFindQueryApiV1ToLiquidFindQueryConverter } from '../../../application/converters/api/v1/LiquidFindQueryApiV1ToLiquidFindQueryConverter';
import { LiquidInsertQueryApiV1ToLiquidInsertQueryConverter } from '../../../application/converters/api/v1/LiquidInsertQueryApiV1ToLiquidInsertQueryConverter';
import { LiquidKindApiV1ToLiquidKindConverter } from '../../../application/converters/api/v1/LiquidKindApiV1ToLiquidKindConverter';
import { LiquidKindToLiquidKindApiV1Converter } from '../../../application/converters/api/v1/LiquidKindToLiquidKindApiV1Converter';
import { LiquidToLiquidApiV1Converter } from '../../../application/converters/api/v1/LiquidToLiquidApiV1Converter';
import { GetDrinkApiV1HttpRequestProcessor } from '../../../application/requestProcessors/GetDrinkApiV1HttpRequestProcessor';
import { GetLiquidApiV1HttpRequestProcessor } from '../../../application/requestProcessors/GetLiquidApiV1HttpRequestProcessor';
import { PostDrinkApiV1HttpRequestProcessor } from '../../../application/requestProcessors/PostDrinkApiV1HttpRequestProcessor';
import { PostLiquidApiV1HttpRequestProcessor } from '../../../application/requestProcessors/PostLiquidApiV1HttpRequestProcessor';
import { FindOneDrinkUseCase } from '../../../application/useCases/FindOneDrinkUseCase';
import { FindOneLiquidUseCase } from '../../../application/useCases/FindOneLiquidUseCase';
import { InsertOneDrinkUseCase } from '../../../application/useCases/InsertOneDrinkUseCase';
import { InsertOneLiquidUseCase } from '../../../application/useCases/InsertOneLiquidUseCase';
import { drinksInjectionSymbolsMap } from '../../../domain/injection/drinksInjectionSymbolsMap';
import { DrinkCreationRuleValidator } from '../../../domain/ruleValidators/DrinkCreationRuleValidator';
import { AzureGetDrinkApiV1HttpRequestController } from '../../azure/controllers/AzureGetDrinkApiV1HttpRequestController';
import { AzureGetLiquidApiV1HttpRequestController } from '../../azure/controllers/AzureGetLiquidApiV1HttpRequestController';
import { AzurePostDrinkApiV1HttpRequestController } from '../../azure/controllers/AzurePostDrinkApiV1HttpRequestController';
import { AzurePostLiquidApiV1HttpRequestController } from '../../azure/controllers/AzurePostLiquidApiV1HttpRequestController';
import { FindLiquidsCosmosDbSqlAdapter } from '../../cosmosDbSql/adapters/FindLiquidsCosmosDbSqlAdapter';
import { FindOneDrinkCosmosDbSqlAdapter } from '../../cosmosDbSql/adapters/FindOneDrinkCosmosDbSqlAdapter';
import { FindOneLiquidCosmosDbSqlAdapter } from '../../cosmosDbSql/adapters/FindOneLiquidCosmosDbSqlAdapter';
import { InsertOneDrinkCosmosDbSqlAdapter } from '../../cosmosDbSql/adapters/InsertOneDrinkCosmosDbSqlAdapter';
import { InsertOneLiquidCosmosDbAdapter } from '../../cosmosDbSql/adapters/InsertOneLiquidCosmosDbSqlAdapter';
import { DrinkCosmosSqlDbToDrinkConverter } from '../../cosmosDbSql/converters/DrinkCosmosDbSqlToDrinkConverter';
import { DrinkFindQueryToDrinkCosmosDbSqlFindOneQueryConverter } from '../../cosmosDbSql/converters/DrinkFindQueryToDrinkCosmosDbSqlFindOneQueryConverter';
import { DrinkInsertQueryToDrinkCosmosDbSqlInsertQueryConverter } from '../../cosmosDbSql/converters/DrinkInsertQueryToDrinkCosmosDbSqlInsertQueryConverter';
import { DrinkItemCosmosDbSqlToDrinkItemConverter } from '../../cosmosDbSql/converters/DrinkItemCosmosDbSqlToDrinkItemConverter';
import { DrinkItemToDrinkItemCosmosDbSqlConverter } from '../../cosmosDbSql/converters/DrinkItemToDrinkItemCosmosDbSqlConverter';
import { DrinkKindCosmosDbSqlToDrinkKindConverter } from '../../cosmosDbSql/converters/DrinkKindCosmosDbSqlToDrinkKindConverter';
import { DrinkKindToDrinkKindCosmosDbSqlConverter } from '../../cosmosDbSql/converters/DrinkKindToDrinkKindCosmosDbSqlConverter';
import { LiquidCosmosDbSqlToLiquidConverter } from '../../cosmosDbSql/converters/LiquidCosmosDbSqlToLiquidConverter';
import { LiquidFindQueryToCosmosDbSqlFeedOptionsConverter } from '../../cosmosDbSql/converters/LiquidFindQueryToCosmosDbSqlFeedOptionsConverter';
import { LiquidFindQueryToLiquidCosmosDbSqlFindOneQueryConverter } from '../../cosmosDbSql/converters/LiquidFindQueryToLiquidCosmosDbSqlFindOneQueryConverter';
import { LiquidFindQueryToLiquidCosmosDbSqlFindQueryConverter } from '../../cosmosDbSql/converters/LiquidFindQueryToLiquidCosmosDbSqlFindQueryConverter';
import { LiquidInsertQueryToLiquidCosmosDbSqlInsertQueryConverter } from '../../cosmosDbSql/converters/LiquidInsertQueryToLiquidCosmosDbSqlInsertQueryConverter';
import { LiquidKindCosmosDbSqlToLiquidKindConverter } from '../../cosmosDbSql/converters/LiquidKindCosmosDbSqlToLiquidKindConverter';
import { LiquidKindToLiquidKindCosmosDbSqlConverter } from '../../cosmosDbSql/converters/LiquidKindToLiquidKindCosmosDbSqlConverter';

@Module({
  exports: [
    drinksInjectionSymbolsMap.azureGetDrinkApiV1HttpRequestController,
    drinksInjectionSymbolsMap.azureGetLiquidApiV1HttpRequestController,
    drinksInjectionSymbolsMap.azurePostDrinkApiV1HttpRequestController,
    drinksInjectionSymbolsMap.azurePostLiquidApiV1HttpRequestController,
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
      provide:
        drinksInjectionSymbolsMap.azureGetDrinkApiV1HttpRequestController,
      useClass: AzureGetDrinkApiV1HttpRequestController,
    },
    {
      provide:
        drinksInjectionSymbolsMap.azureGetLiquidApiV1HttpRequestController,
      useClass: AzureGetLiquidApiV1HttpRequestController,
    },
    {
      provide:
        drinksInjectionSymbolsMap.azurePostDrinkApiV1HttpRequestController,
      useClass: AzurePostDrinkApiV1HttpRequestController,
    },
    {
      provide:
        drinksInjectionSymbolsMap.azurePostLiquidApiV1HttpRequestController,
      useClass: AzurePostLiquidApiV1HttpRequestController,
    },
    {
      provide: drinksInjectionSymbolsMap.drinkCosmosDbSqlToDrinkConverter,
      useClass: DrinkCosmosSqlDbToDrinkConverter,
    },
    {
      provide: drinksInjectionSymbolsMap.drinkCreationRuleValidator,
      useClass: DrinkCreationRuleValidator,
    },
    {
      provide:
        drinksInjectionSymbolsMap.drinkFindQueryApiV1ToDrinkFindQueryConverter,
      useClass: DrinkFindQueryApiV1ToDrinkFindQueryConverter,
    },
    {
      provide:
        drinksInjectionSymbolsMap.drinkFindQueryToDrinkCosmosDbSqlFindOneQueryConverter,
      useClass: DrinkFindQueryToDrinkCosmosDbSqlFindOneQueryConverter,
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
      provide: drinksInjectionSymbolsMap.findOneDrinkAdapter,
      useClass: FindOneDrinkCosmosDbSqlAdapter,
    },
    {
      provide: drinksInjectionSymbolsMap.findOneDrinkUseCase,
      useClass: FindOneDrinkUseCase,
    },
    {
      provide: drinksInjectionSymbolsMap.findOneLiquidAdapter,
      useClass: FindOneLiquidCosmosDbSqlAdapter,
    },
    {
      provide: drinksInjectionSymbolsMap.findOneLiquidUseCase,
      useClass: FindOneLiquidUseCase,
    },
    {
      provide: drinksInjectionSymbolsMap.getDrinkApiV1HttpRequestProcessor,
      useClass: GetDrinkApiV1HttpRequestProcessor,
    },
    {
      provide: drinksInjectionSymbolsMap.getDrinkApiV1RequestController,
      useClass: GetDrinkApiV1RequestController,
    },
    {
      provide: drinksInjectionSymbolsMap.getLiquidApiV1HttpRequestProcessor,
      useClass: GetLiquidApiV1HttpRequestProcessor,
    },
    {
      provide: drinksInjectionSymbolsMap.getLiquidApiV1RequestController,
      useClass: GetLiquidApiV1RequestController,
    },
    {
      provide: drinksInjectionSymbolsMap.insertOneLiquidUseCase,
      useClass: InsertOneLiquidUseCase,
    },
    {
      provide: drinksInjectionSymbolsMap.insertOneDrinkAdapter,
      useClass: InsertOneDrinkCosmosDbSqlAdapter,
    },
    {
      provide: drinksInjectionSymbolsMap.insertOneDrinkUseCase,
      useClass: InsertOneDrinkUseCase,
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
        drinksInjectionSymbolsMap.liquidFindQueryToCosmosDbSqlFeedOptionsConverter,
      useClass: LiquidFindQueryToCosmosDbSqlFeedOptionsConverter,
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
      provide: drinksInjectionSymbolsMap.postDrinkApiV1HttpRequestProcessor,
      useClass: PostDrinkApiV1HttpRequestProcessor,
    },
    {
      provide: drinksInjectionSymbolsMap.postDrinkApiV1RequestController,
      useClass: PostDrinkApiV1RequestController,
    },
    {
      provide: drinksInjectionSymbolsMap.postLiquidApiV1HttpRequestProcessor,
      useClass: PostLiquidApiV1HttpRequestProcessor,
    },
    {
      provide: drinksInjectionSymbolsMap.postLiquidApiV1RequestController,
      useClass: PostLiquidApiV1RequestController,
    },
  ],
})
export class DrinksContainerModule {}
