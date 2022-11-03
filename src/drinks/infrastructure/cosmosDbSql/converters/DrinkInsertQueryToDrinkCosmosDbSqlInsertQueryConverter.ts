import { Inject } from '@nestjs/common';

import { Converter } from '../../../../common/domain/modules/Converter';
import { InsertQuery } from '../../../../db/infrastructure/cosmosDbSql/models/InsertQuery';
import { DrinkInsertQuery } from '../../../application/queries/DrinkInsertQuery';
import { drinksInjectionSymbolsMap } from '../../../domain/injection/drinksInjectionSymbolsMap';
import { DrinkKind } from '../../../domain/models/DrinkKind';
import { DrinkCosmosDbSql } from '../models/DrinkCosmosDbSql';
import { DrinkKindCosmosDbSql } from '../models/DrinkKindCosmosDbSql';

const PARTITION_KEY: string = 'partition-key';

export class DrinkInsertQueryToDrinkCosmosDbSqlInsertQueryConverter
  implements Converter<DrinkInsertQuery, InsertQuery<DrinkCosmosDbSql>>
{
  readonly #drinkKindToDrinkKindCosmosDbSqlConverter: Converter<
    DrinkKind,
    DrinkKindCosmosDbSql
  >;

  constructor(
    @Inject(drinksInjectionSymbolsMap.drinkKindToDrinkKindCosmosDbSqlConverter)
    drinkKindToDrinkKindCosmosDbSqlConverter: Converter<
      DrinkKind,
      DrinkKindCosmosDbSql
    >,
  ) {
    this.#drinkKindToDrinkKindCosmosDbSqlConverter =
      drinkKindToDrinkKindCosmosDbSqlConverter;
  }

  public convert(
    drinkInsertQuery: DrinkInsertQuery,
  ): InsertQuery<DrinkCosmosDbSql> {
    return {
      items: [],
      kind: this.#drinkKindToDrinkKindCosmosDbSqlConverter.convert(
        drinkInsertQuery.kind,
      ),
      name: drinkInsertQuery.name,
      partitionKey: PARTITION_KEY,
    };
  }
}
