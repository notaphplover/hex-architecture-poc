// eslint-disable-next-line @typescript-eslint/typedef
export const drinksInjectionSymbolsMap = {
  drinkMemoryPersistenceService: Symbol.for('DrinkMemoryPersistenceService'),
  findOneLiquidAdapter: Symbol.for('FindOneLiquidAdapter'),
  findOneLiquidHandler: Symbol.for('FindOneLiquidHandler'),
  getLiquidApiV1HttpRequestController: Symbol.for(
    'GetLiquidApiV1HttpRequestController',
  ),
  getLiquidApiV1HttpRequestProcessor: Symbol.for(
    'GetLiquidApiV1HttpRequestProcessor',
  ),
  insertOneLiquidAdapter: Symbol.for('InsertOneLiquidAdapter'),
  insertOneLiquidHandler: Symbol.for('InsertOneLiquidHandler'),
  liquidCosmosDbSqlToLiquidConverter: Symbol.for(
    'LiquidCosmosDbSqlToLiquidConverter',
  ),
  liquidFindQueryApiV1ToLiquidFindQueryConverter: Symbol.for(
    'LiquidFindQueryApiV1ToLiquidFindQueryConverter',
  ),
  liquidFindQueryToLiquidCosmosDbSqlFindOneQueryConverter: Symbol.for(
    'LiquidFindQueryToLiquidCosmosDbSqlFindOneQueryConverter',
  ),
  liquidFindQueryToLiquidCosmosDbSqlFindQueryConverter: Symbol.for(
    'LiquidFindQueryToLiquidCosmosDbSqlFindQueryConverter',
  ),
  liquidInsertQueryApiV1ToLiquidInsertQueryConverter: Symbol.for(
    'LiquidInsertQueryApiV1ToLiquidInsertQueryConverter',
  ),
  liquidInsertQueryToLiquidCosmosDbSqlInsertQueryConverter: Symbol.for(
    'LiquidInsertQueryToLiquidCosmosDbSqlInsertQueryConverter',
  ),
  liquidKindApiV1ToLiquidKindConverter: Symbol.for(
    'LiquidKindApiV1ToLiquidKindConverter',
  ),
  liquidKindCosmosDbSqlToLiquidKindConverter: Symbol.for(
    'LiquidKindCosmosDbSqlToLiquidKindConverter',
  ),
  liquidKindToLiquidKindApiV1Converter: Symbol.for(
    'LiquidKindToLiquidKindApiV1Converter',
  ),
  liquidKindToLiquidKindCosmosDbSqlConverter: Symbol.for(
    'liquidKindToLiquidKindCosmosDbSqlConverter',
  ),
  liquidToLiquidApiV1Converter: Symbol.for('LiquidToLiquidApiV1Converter'),
  postLiquidApiV1HttpRequestController: Symbol.for(
    'PostLiquidApiV1HttpRequestController',
  ),
  postLiquidApiV1HttpRequestProcessor: Symbol.for(
    'PostLiquidApiV1HttpRequestProcessor',
  ),
};
