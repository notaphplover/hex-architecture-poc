import { Container, CosmosClient, Database } from '@azure/cosmos';
import { DynamicModule, Module, Provider } from '@nestjs/common';

import { Builder } from '../../../../common/domain/modules/Builder';
import { dbInjectionSymbolsMap } from '../../../domain/injection/dbInjectionSymbolsMap';
import { CosmosDbSqlConfig } from '../../cosmosDbSql/models/CosmosDbSqlConfig';
import { DbContainerModule } from './DbContainerModule';

@Module({
  imports: [DbContainerModule],
})
export class CosmosSqlContainerModule {
  public static forDb(
    dbAlias: string,
    containerNames: string[],
  ): DynamicModule {
    return {
      exports: [
        CosmosSqlContainerModule.getDbProviderSymbol(dbAlias),
        ...containerNames.map((containerName: string): symbol =>
          CosmosSqlContainerModule.getContainerProviderSymbol(
            dbAlias,
            containerName,
          ),
        ),
      ],
      imports: [DbContainerModule],
      module: CosmosSqlContainerModule,
      providers: [
        {
          inject: [dbInjectionSymbolsMap.cosmosDbSqlConfigBuilder],
          provide: CosmosSqlContainerModule.getCosmosDbSqlConfigSymbol(),
          useFactory: (
            cosmosDbSqlConfigBuilder: Builder<CosmosDbSqlConfig>,
          ): CosmosDbSqlConfig => cosmosDbSqlConfigBuilder.build(),
        },
        {
          inject: [CosmosSqlContainerModule.getCosmosDbSqlConfigSymbol()],
          provide: CosmosSqlContainerModule.getCosmosClientProviderSymbol(),
          useFactory: (cosmosDbSqlConfig: CosmosDbSqlConfig): CosmosClient => {
            return new CosmosClient({
              endpoint: cosmosDbSqlConfig.endpoint,
              key: cosmosDbSqlConfig.key,
            });
          },
        },
        {
          inject: [
            CosmosSqlContainerModule.getCosmosClientProviderSymbol(),
            CosmosSqlContainerModule.getCosmosDbSqlConfigSymbol(),
          ],
          provide: CosmosSqlContainerModule.getDbProviderSymbol(dbAlias),
          useFactory: async (
            cosmosClient: CosmosClient,
            cosmosDbSqlConfig: CosmosDbSqlConfig,
          ): Promise<Database> =>
            (
              await cosmosClient.databases.createIfNotExists({
                id: cosmosDbSqlConfig.dbName,
              })
            ).database,
        },
        ...containerNames.map(
          (containerName: string): Provider => ({
            inject: [CosmosSqlContainerModule.getDbProviderSymbol(dbAlias)],
            provide: CosmosSqlContainerModule.getContainerProviderSymbol(
              dbAlias,
              containerName,
            ),
            useFactory: (database: Database): Container =>
              database.container(containerName),
          }),
        ),
      ],
    };
  }

  public static getContainerProviderSymbol(
    dbName: string,
    containerName: string,
  ): symbol {
    return Symbol.for(`cosmos_db_sql_${dbName}_container_${containerName}`);
  }

  public static getCosmosClientProviderSymbol(): symbol {
    return Symbol.for('CosmosClient');
  }

  public static getCosmosDbSqlConfigSymbol(): symbol {
    return Symbol.for('CosmosDbSqlConfig');
  }

  public static getDbProviderSymbol(dbName: string): symbol {
    return Symbol.for(`cosmos_db_sql_${dbName}`);
  }
}
