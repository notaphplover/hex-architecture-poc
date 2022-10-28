import { Module } from '@nestjs/common';

import { dbInjectionSymbolsMap } from '../../../domain/injection/dbInjectionSymbolsMap';
import { CosmosDbSqlFindOneQueryToCosmosDbSqlQuerySpecConverter } from '../../cosmosDbSql/converters/CosmosDbSqlFindOneQueryToCosmosDbSqlQuerySpecConverter';
import { CosmosDbSqlFindQueryToCosmosDbSqlQuerySpecConverter } from '../../cosmosDbSql/converters/CosmosDbSqlFindQueryToCosmosDbSqlQuerySpecConverter';

@Module({
  exports: [
    dbInjectionSymbolsMap.cosmosDbSqlFindOneQueryToCosmosDbSqlQuerySpecConverter,
    dbInjectionSymbolsMap.cosmosDbSqlFindQueryToCosmosDbSqlQuerySpecConverter,
  ],
  providers: [
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
