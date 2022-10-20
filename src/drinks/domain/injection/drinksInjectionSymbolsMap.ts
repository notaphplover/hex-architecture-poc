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
  liquidDbToLiquidConverter: Symbol.for('LiquidDbToLiquidConverter'),
  liquidFindQueryApiV1ToLiquidFindQueryConverter: Symbol.for(
    'LiquidFindQueryApiV1ToLiquidFindQueryConverter',
  ),
  liquidFindQueryToLiquidMemoryFindOneQueryConverter: Symbol.for(
    'LiquidFindQueryToLiquidMemoryFindOneQueryConverter',
  ),
  liquidInsertQueryApiV1ToLiquidInsertQueryConverter: Symbol.for(
    'LiquidInsertQueryApiV1ToLiquidInsertQueryConverter',
  ),
  liquidInsertQueryToLiquidMemoryInsertQueryConverter: Symbol.for(
    'LiquidInsertQueryToLiquidMemoryInsertQueryConverter',
  ),
  liquidKindApiV1ToLiquidKindConverter: Symbol.for(
    'LiquidKindApiV1ToLiquidKindConverter',
  ),
  liquidKindDbToLiquidKindConverter: Symbol.for(
    'liquidKindDbToLiquidKindConverter',
  ),
  liquidKindToLiquidKindApiV1Converter: Symbol.for(
    'LiquidKindToLiquidKindApiV1Converter',
  ),
  liquidKindToLiquidKindDbConverter: Symbol.for(
    'liquidKindToLiquidKindDbConverter',
  ),
  liquidMemoryPersistenceService: Symbol.for('LiquidMemoryPersistenceService'),
  liquidToLiquidApiV1Converter: Symbol.for('LiquidToLiquidApiV1Converter'),
  postLiquidApiV1HttpRequestController: Symbol.for(
    'PostLiquidApiV1HttpRequestController',
  ),
  postLiquidApiV1HttpRequestProcessor: Symbol.for(
    'PostLiquidApiV1HttpRequestProcessor',
  ),
};
