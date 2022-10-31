// eslint-disable-next-line @typescript-eslint/typedef
export const dbInjectionSymbolsMap = {
  cosmosDbSqlConfigBuilder: Symbol.for('CosmosDbSqlConfigBuilder'),
  cosmosDbSqlFindOneQueryToCosmosDbSqlQuerySpecConverter: Symbol.for(
    'CosmosDbSqlFindOneQueryToCosmosDbSqlQuerySpecConverter',
  ),
  cosmosDbSqlFindQueryToCosmosDbSqlQuerySpecConverter: Symbol.for(
    'CosmosDbSqlFindQueryToCosmosDbSqlQuerySpecConverter',
  ),
};
