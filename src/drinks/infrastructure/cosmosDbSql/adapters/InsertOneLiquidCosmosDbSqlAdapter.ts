import { Container } from '@azure/cosmos';
import { Inject, Injectable } from '@nestjs/common';

import { Converter } from '../../../../common/domain/modules/Converter';
import { ConverterAsync } from '../../../../common/domain/modules/ConverterAsync';
import { InsertOneEntityCosmosDbSqlAdapter } from '../../../../db/infrastructure/cosmosDbSql/adapters/InsertOneEntityCosmosDbSqlAdapter';
import { CosmosDbSqlContainerName } from '../../../../db/infrastructure/cosmosDbSql/models/CosmosDbSqlContainerName';
import { CosmosDbSqlDatabaseAlias } from '../../../../db/infrastructure/cosmosDbSql/models/CosmosDbSqlDatabaseAlias';
import { CosmosSqlContainerModule } from '../../../../db/infrastructure/nestJs/injection/CosmosSqlContainerModule';
import { LiquidInsertQuery } from '../../../application/queries/LiquidInsertQuery';
import { drinksInjectionSymbolsMap } from '../../../domain/injection/drinksInjectionSymbolsMap';
import { Liquid } from '../../../domain/models/Liquid';
import { LiquidCosmosDbSql } from '../models/LiquidCosmosDbSql';

@Injectable()
export class InsertOneLiquidCosmosDbAdapter extends InsertOneEntityCosmosDbSqlAdapter<
  LiquidInsertQuery,
  Liquid,
  LiquidCosmosDbSql
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @Inject(
      CosmosSqlContainerModule.getContainerProviderSymbol(
        CosmosDbSqlDatabaseAlias.db,
        CosmosDbSqlContainerName.liquids,
      ),
    )
    container: Container,
    @Inject(drinksInjectionSymbolsMap.liquidCosmosDbSqlToLiquidConverter)
    liquidCosmosDbSqlToLiquidConverters:
      | Converter<LiquidCosmosDbSql, Liquid>
      | ConverterAsync<LiquidCosmosDbSql, Liquid>,
    @Inject(
      drinksInjectionSymbolsMap.liquidInsertQueryToLiquidCosmosDbSqlInsertQueryConverter,
    )
    liquidInsertQueryToLiquidCosmosDbSqlInsertQueryConverter: Converter<
      LiquidInsertQuery,
      LiquidCosmosDbSql
    >,
  ) {
    super(
      container,
      liquidCosmosDbSqlToLiquidConverters,
      liquidInsertQueryToLiquidCosmosDbSqlInsertQueryConverter,
    );
  }
}
