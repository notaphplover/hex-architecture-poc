import { Container, FeedOptions, SqlQuerySpec } from '@azure/cosmos';
import { Inject, Injectable } from '@nestjs/common';

import { Converter } from '../../../../common/domain/modules/Converter';
import { ConverterAsync } from '../../../../common/domain/modules/ConverterAsync';
import { dbInjectionSymbolsMap } from '../../../../db/domain/injection/dbInjectionSymbolsMap';
import { FindOneEntityCosmosDbSqlAdapter } from '../../../../db/infrastructure/cosmosDbSql/adapters/FindOneEntityCosmosDbSqlAdapter';
import { CosmosDbSqlContainerName } from '../../../../db/infrastructure/cosmosDbSql/models/CosmosDbSqlContainerName';
import { CosmosDbSqlDatabaseAlias } from '../../../../db/infrastructure/cosmosDbSql/models/CosmosDbSqlDatabaseAlias';
import { FindOneQuery } from '../../../../db/infrastructure/cosmosDbSql/models/FindOneQuery';
import { CosmosSqlContainerModule } from '../../../../db/infrastructure/nestJs/injection/CosmosSqlContainerModule';
import { DrinkFindQuery } from '../../../application/queries/DrinkFindQuery';
import { drinksInjectionSymbolsMap } from '../../../domain/injection/drinksInjectionSymbolsMap';
import { Drink } from '../../../domain/models/Drink';
import { DrinkCosmosDbSql } from '../models/DrinkCosmosDbSql';

@Injectable()
export class FindOneDrinkCosmosDbSqlAdapter extends FindOneEntityCosmosDbSqlAdapter<
  DrinkFindQuery,
  Drink,
  DrinkCosmosDbSql
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @Inject(
      CosmosSqlContainerModule.getContainerProviderSymbol(
        CosmosDbSqlDatabaseAlias.db,
        CosmosDbSqlContainerName.drinks,
      ),
    )
    container: Container,
    @Inject(drinksInjectionSymbolsMap.drinkCosmosDbSqlToDrinkConverter)
    drinkCosmosDbSqlToDrinkConverters:
      | Converter<DrinkCosmosDbSql, Drink>
      | ConverterAsync<DrinkCosmosDbSql, Drink>,
    @Inject(
      drinksInjectionSymbolsMap.drinkFindQueryToDrinkCosmosDbSqlFindOneQueryConverter,
    )
    drinkFindQueryToDrinkCosmosDbSqlFindOneQueryConverter: Converter<
      DrinkFindQuery,
      FindOneQuery<DrinkCosmosDbSql>
    >,
    @Inject(
      drinksInjectionSymbolsMap.drinkFindQueryToCosmosDbSqlFeedOptionsConverter,
    )
    drinkFindQueryToCosmosDbSqlFeedOptionsConverter: Converter<
      DrinkFindQuery,
      FeedOptions
    >,
    @Inject(
      dbInjectionSymbolsMap.cosmosDbSqlFindOneQueryToCosmosDbSqlQuerySpecConverter,
    )
    cosmosDbSqlFindOneQueryToCosmosDbSqlQuerySpecConverter: Converter<
      FindOneQuery<DrinkCosmosDbSql>,
      SqlQuerySpec
    >,
  ) {
    super(
      container,
      drinkCosmosDbSqlToDrinkConverters,
      drinkFindQueryToDrinkCosmosDbSqlFindOneQueryConverter,
      drinkFindQueryToCosmosDbSqlFeedOptionsConverter,
      cosmosDbSqlFindOneQueryToCosmosDbSqlQuerySpecConverter,
    );
  }
}
