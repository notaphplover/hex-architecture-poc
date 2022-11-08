import { Container, FeedOptions, SqlQuerySpec } from '@azure/cosmos';
import { Inject, Injectable } from '@nestjs/common';

import { Converter } from '../../../../common/domain/modules/Converter';
import { ConverterAsync } from '../../../../common/domain/modules/ConverterAsync';
import { dbInjectionSymbolsMap } from '../../../../db/domain/injection/dbInjectionSymbolsMap';
import { FindEntitiesCosmosDbSqlAdapter } from '../../../../db/infrastructure/cosmosDbSql/adapters/FindEntitiesCosmosDbSqlAdapter';
import { CosmosDbSqlContainerName } from '../../../../db/infrastructure/cosmosDbSql/models/CosmosDbSqlContainerName';
import { CosmosDbSqlDatabaseAlias } from '../../../../db/infrastructure/cosmosDbSql/models/CosmosDbSqlDatabaseAlias';
import { FindQuery } from '../../../../db/infrastructure/cosmosDbSql/models/FindQuery';
import { CosmosSqlContainerModule } from '../../../../db/infrastructure/nestJs/injection/CosmosSqlContainerModule';
import { LiquidFindQuery } from '../../../application/queries/LiquidFindQuery';
import { drinksInjectionSymbolsMap } from '../../../domain/injection/drinksInjectionSymbolsMap';
import { Liquid } from '../../../domain/models/Liquid';
import { LiquidCosmosDbSql } from '../models/LiquidCosmosDbSql';

@Injectable()
export class FindLiquidsCosmosDbSqlAdapter extends FindEntitiesCosmosDbSqlAdapter<
  LiquidFindQuery,
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
      drinksInjectionSymbolsMap.liquidFindQueryToLiquidCosmosDbSqlFindQueryConverter,
    )
    liquidFindQueryToLiquidCosmosDbSqlFindOneQueryConverter: Converter<
      LiquidFindQuery,
      FindQuery<LiquidCosmosDbSql>
    >,
    @Inject(
      drinksInjectionSymbolsMap.liquidFindQueryToCosmosDbSqlFeedOptionsConverter,
    )
    liquidFindQueryToCosmosDbSqlFeedOptionsConverter: Converter<
      LiquidFindQuery,
      FeedOptions
    >,
    @Inject(
      dbInjectionSymbolsMap.cosmosDbSqlFindQueryToCosmosDbSqlQuerySpecConverter,
    )
    cosmosDbSqlFindQueryToCosmosDbSqlQuerySpecConverter: Converter<
      FindQuery<LiquidCosmosDbSql>,
      SqlQuerySpec
    >,
  ) {
    super(
      container,
      liquidCosmosDbSqlToLiquidConverters,
      liquidFindQueryToLiquidCosmosDbSqlFindOneQueryConverter,
      liquidFindQueryToCosmosDbSqlFeedOptionsConverter,
      cosmosDbSqlFindQueryToCosmosDbSqlQuerySpecConverter,
    );
  }
}
