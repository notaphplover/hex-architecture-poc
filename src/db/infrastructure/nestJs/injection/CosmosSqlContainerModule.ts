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
  public static forDb(dbName: string, containerNames: string[]): DynamicModule {
    return {
      imports: [DbContainerModule],
      module: CosmosSqlContainerModule,
      providers: [
        {
          inject: [dbInjectionSymbolsMap.cosmosDbSqlConfigBuilder],
          provide: CosmosSqlContainerModule.getCosmosClientProviderSymbol(),
          useFactory: (
            cosmosDbSqlConfigBuilder: Builder<CosmosDbSqlConfig>,
          ): CosmosClient => {
            const cosmosDbSqlConfig: CosmosDbSqlConfig =
              cosmosDbSqlConfigBuilder.build();

            return new CosmosClient({
              endpoint: cosmosDbSqlConfig.endpoint,
              key: cosmosDbSqlConfig.key,
            });
          },
        },
        {
          inject: [CosmosSqlContainerModule.getCosmosClientProviderSymbol()],
          provide: CosmosSqlContainerModule.getDbProviderSymbol(dbName),
          useFactory: async (cosmosClient: CosmosClient): Promise<Database> =>
            (await cosmosClient.databases.createIfNotExists({ id: dbName }))
              .database,
        },
        ...containerNames.map(
          (containerName: string): Provider => ({
            inject: [CosmosSqlContainerModule.getDbProviderSymbol(dbName)],
            provide: CosmosSqlContainerModule.getContainerProviderSymbol(
              dbName,
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
    return Symbol.for(`cosmos_sql_db_${dbName}_container_${containerName}`);
  }

  public static getCosmosClientProviderSymbol(): symbol {
    return Symbol.for('CosmosClient');
  }

  public static getDbProviderSymbol(dbName: string): symbol {
    return Symbol.for(`cosmos_sql_db_${dbName}`);
  }
}
