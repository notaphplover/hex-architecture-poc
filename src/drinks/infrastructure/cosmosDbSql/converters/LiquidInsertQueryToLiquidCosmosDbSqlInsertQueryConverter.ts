import { Inject, Injectable } from '@nestjs/common';

import { Converter } from '../../../../common/domain/modules/Converter';
import { InsertQuery } from '../../../../db/infrastructure/cosmosDbSql/models/InsertQuery';
import { LiquidInsertQuery } from '../../../application/queries/LiquidInsertQuery';
import { drinksInjectionSymbolsMap } from '../../../domain/injection/drinksInjectionSymbolsMap';
import { LiquidKind } from '../../../domain/models/LiquidKind';
import { LiquidCosmosDbSql } from '../models/LiquidCosmosDbSql';
import { LiquidCosmosDbSqlPartitionKey } from '../models/LiquidCosmosDbSqlPartitionKey';
import { LiquidKindCosmosDbSql } from '../models/LiquidKindCosmosDbSql';

const PARTITION_KEY: LiquidCosmosDbSqlPartitionKey = 'partition-key';

@Injectable()
export class LiquidInsertQueryToLiquidCosmosDbSqlInsertQueryConverter
  implements Converter<LiquidInsertQuery, InsertQuery<LiquidCosmosDbSql>>
{
  readonly #liquidKindToLiquidKindCosmosDbSqlConverter: Converter<
    LiquidKind,
    LiquidKindCosmosDbSql
  >;

  constructor(
    @Inject(
      drinksInjectionSymbolsMap.liquidKindToLiquidKindCosmosDbSqlConverter,
    )
    liquidKindToLiquidKindCosmosDbSqlConverter: Converter<
      LiquidKind,
      LiquidKindCosmosDbSql
    >,
  ) {
    this.#liquidKindToLiquidKindCosmosDbSqlConverter =
      liquidKindToLiquidKindCosmosDbSqlConverter;
  }

  public convert(
    liquidInsertQuery: LiquidInsertQuery,
  ): InsertQuery<LiquidCosmosDbSql> {
    return {
      kind: this.#liquidKindToLiquidKindCosmosDbSqlConverter.convert(
        liquidInsertQuery.kind,
      ),
      name: liquidInsertQuery.name,
      partitionKey: PARTITION_KEY,
    };
  }
}
