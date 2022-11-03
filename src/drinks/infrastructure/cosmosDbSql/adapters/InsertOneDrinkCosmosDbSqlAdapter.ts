import { Container } from '@azure/cosmos';
import { Inject, Injectable } from '@nestjs/common';

import { Converter } from '../../../../common/domain/modules/Converter';
import { ConverterAsync } from '../../../../common/domain/modules/ConverterAsync';
import { InsertOneEntityCosmosDbSqlAdapter } from '../../../../db/infrastructure/cosmosDbSql/adapters/InsertOneEntityCosmosDbSqlAdapter';
import { CosmosDbSqlContainerName } from '../../../../db/infrastructure/cosmosDbSql/models/CosmosDbSqlContainerName';
import { CosmosDbSqlDatabaseAlias } from '../../../../db/infrastructure/cosmosDbSql/models/CosmosDbSqlDatabaseAlias';
import { InsertQuery } from '../../../../db/infrastructure/cosmosDbSql/models/InsertQuery';
import { CosmosSqlContainerModule } from '../../../../db/infrastructure/nestJs/injection/CosmosSqlContainerModule';
import { DrinkInsertQuery } from '../../../application/queries/DrinkInsertQuery';
import { drinksInjectionSymbolsMap } from '../../../domain/injection/drinksInjectionSymbolsMap';
import { Drink } from '../../../domain/models/Drink';
import { DrinkCosmosDbSql } from '../models/DrinkCosmosDbSql';

@Injectable()
export class InsertOneDrinkCosmosDbSqlAdapter extends InsertOneEntityCosmosDbSqlAdapter<
  DrinkInsertQuery,
  Drink,
  DrinkCosmosDbSql
> {
  constructor(
    @Inject(
      CosmosSqlContainerModule.getContainerProviderSymbol(
        CosmosDbSqlDatabaseAlias.db,
        CosmosDbSqlContainerName.drinks,
      ),
    )
    container: Container,
    @Inject(drinksInjectionSymbolsMap.drinkCosmosSqlDbToDrinkConverter)
    drinkCosmosDbSqlToDrinkConverter:
      | Converter<DrinkCosmosDbSql, Drink>
      | ConverterAsync<DrinkCosmosDbSql, Drink>,
    @Inject(
      drinksInjectionSymbolsMap.drinkInsertQueryToDrinkCosmosDbSqlInsertQueryConverter,
    )
    drinkInsertQueryToDrinkCosmosDbSqlInsertQueryConverter: Converter<
      DrinkInsertQuery,
      InsertQuery<DrinkCosmosDbSql>
    >,
  ) {
    super(
      container,
      drinkCosmosDbSqlToDrinkConverter,
      drinkInsertQueryToDrinkCosmosDbSqlInsertQueryConverter,
    );
  }
}
