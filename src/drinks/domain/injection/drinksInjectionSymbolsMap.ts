// eslint-disable-next-line @typescript-eslint/typedef
export const drinksInjectionSymbolsMap = {
  insertOneLiquidAdapter: Symbol.for('InsertOneLiquidAdapter'),
  insertOneLiquidHandler: Symbol.for('InsertOneLiquidHandler'),
  liquidInsertQueryToLiquidMemoryInsertQueryConverter: Symbol.for(
    'LiquidInsertQueryToLiquidMemoryInsertQueryConverter',
  ),
  liquidMemoryPersistenceService: Symbol.for('LiquidMemoryPersistenceService'),
};
