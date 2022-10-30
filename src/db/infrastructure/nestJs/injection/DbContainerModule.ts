import { Module } from '@nestjs/common';

import { Builder } from '../../../../common/domain/modules/Builder';
import { envInjectionSymbolsMap } from '../../../../env/domain/envInjectionSymbolsMap';
import { EnvContainerModuler } from '../../../../env/infrastructure/nestJs/EnvContainerModuler';
import { dbInjectionSymbolsMap } from '../../../domain/injection/dbInjectionSymbolsMap';
import { CosmosDbSqlFindOneQueryToCosmosDbSqlQuerySpecConverter } from '../../cosmosDbSql/converters/CosmosDbSqlFindOneQueryToCosmosDbSqlQuerySpecConverter';
import { CosmosDbSqlFindQueryToCosmosDbSqlQuerySpecConverter } from '../../cosmosDbSql/converters/CosmosDbSqlFindQueryToCosmosDbSqlQuerySpecConverter';
import { CosmosDbSqlConfig } from '../../cosmosDbSql/models/CosmosDbSqlConfig';
import { CosmosDbSqlConfigEnvalidBuilder } from '../../envalid/builder/CosmosDbSqlConfigEnvalidBuilder';

@Module({
  exports: [
    dbInjectionSymbolsMap.cosmosDbSqlFindOneQueryToCosmosDbSqlQuerySpecConverter,
    dbInjectionSymbolsMap.cosmosDbSqlFindQueryToCosmosDbSqlQuerySpecConverter,
  ],
  imports: [EnvContainerModuler],
  providers: [
    {
      inject: [envInjectionSymbolsMap.envLoaded],
      provide: dbInjectionSymbolsMap.cosmosDbSqlConfigBuilder,
      useFactory: (): Builder<CosmosDbSqlConfig> =>
        new CosmosDbSqlConfigEnvalidBuilder(),
    },
    {
      provide:
        dbInjectionSymbolsMap.cosmosDbSqlFindOneQueryToCosmosDbSqlQuerySpecConverter,
      useClass: CosmosDbSqlFindOneQueryToCosmosDbSqlQuerySpecConverter,
    },
    {
      provide:
        dbInjectionSymbolsMap.cosmosDbSqlFindQueryToCosmosDbSqlQuerySpecConverter,
      useClass: CosmosDbSqlFindQueryToCosmosDbSqlQuerySpecConverter,
    },
  ],
})
export class DbContainerModule {}
