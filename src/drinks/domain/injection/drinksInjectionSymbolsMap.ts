// eslint-disable-next-line @typescript-eslint/typedef
export const drinksInjectionSymbolsMap = {
  insertOneLiquidAdapter: Symbol.for('InsertOneLiquidAdapter'),
  insertOneLiquidHandler: Symbol.for('InsertOneLiquidHandler'),
  liquidInsertQueryApiV1ToLiquidInsertQueryConverter: Symbol.for(
    'LiquidInsertQueryApiV1ToLiquidInsertQueryConverter',
  ),
  liquidInsertQueryToLiquidMemoryInsertQueryConverter: Symbol.for(
    'LiquidInsertQueryToLiquidMemoryInsertQueryConverter',
  ),
  liquidKindApiV1ToLiquidKindConverter: Symbol.for(
    'LiquidKindApiV1ToLiquidKindConverter',
  ),
  liquidKindToLiquidKindApiV1Converter: Symbol.for(
    'LiquidKindToLiquidKindApiV1Converter',
  ),
  liquidMemoryPersistenceService: Symbol.for('LiquidMemoryPersistenceService'),
  liquidToLiquidApiV1Converter: Symbol.for('LiquidToLiquidApiV1Converter'),
};
