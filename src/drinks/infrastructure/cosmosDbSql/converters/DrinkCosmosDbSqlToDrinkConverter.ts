import { Inject, Injectable } from '@nestjs/common';

import { Converter } from '../../../../common/domain/modules/Converter';
import { ConverterAsync } from '../../../../common/domain/modules/ConverterAsync';
import { FindEntitiesPort } from '../../../../db/application/ports/FindEntititesPort';
import { AppError } from '../../../../errors/application/models/AppError';
import { AppErrorKind } from '../../../../errors/application/models/AppErrorKind';
import { LiquidFindQuery } from '../../../application/queries/LiquidFindQuery';
import { drinksInjectionSymbolsMap } from '../../../domain/injection/drinksInjectionSymbolsMap';
import { Drink } from '../../../domain/models/Drink';
import { DrinkItem } from '../../../domain/models/DrinkItem';
import { DrinkKind } from '../../../domain/models/DrinkKind';
import { Liquid } from '../../../domain/models/Liquid';
import { DrinkCosmosDbSql } from '../models/DrinkCosmosDbSql';
import { DrinkItemCosmosDbSql } from '../models/DrinkItemCosmosDbSql';
import { DrinkKindCosmosDbSql } from '../models/DrinkKindCosmosDbSql';

@Injectable()
export class DrinkCosmosSqlDbToDrinkConverter
  implements ConverterAsync<DrinkCosmosDbSql, Drink>
{
  readonly #drinkKindCosmosDbSqlToDrinkKindConverter: Converter<
    DrinkKindCosmosDbSql,
    DrinkKind
  >;
  readonly #drinkItemCosmosDbSqlToDrinkItemConverter: Converter<
    DrinkItemCosmosDbSql,
    DrinkItem,
    Liquid
  >;
  readonly #findLiquidsPort: FindEntitiesPort<LiquidFindQuery, Liquid>;

  constructor(
    @Inject(drinksInjectionSymbolsMap.drinkKindCosmosDbSqlToDrinkKindConverter)
    drinkKindCosmosDbSqlToDrinkKindConverter: Converter<
      DrinkKindCosmosDbSql,
      DrinkKind
    >,
    @Inject(drinksInjectionSymbolsMap.drinkItemCosmosDbSqlToDrinkItemConverter)
    drinkItemCosmosDbSqlToDrinkItemConverter: Converter<
      DrinkItemCosmosDbSql,
      DrinkItem,
      Liquid
    >,
    @Inject(drinksInjectionSymbolsMap.findLiquidsAdapter)
    findLiquidsPort: FindEntitiesPort<LiquidFindQuery, Liquid>,
  ) {
    this.#drinkKindCosmosDbSqlToDrinkKindConverter =
      drinkKindCosmosDbSqlToDrinkKindConverter;
    this.#drinkItemCosmosDbSqlToDrinkItemConverter =
      drinkItemCosmosDbSqlToDrinkItemConverter;
    this.#findLiquidsPort = findLiquidsPort;
  }

  public async convert(drinkCosmosDbSql: DrinkCosmosDbSql): Promise<Drink> {
    const liquidFindQuery: LiquidFindQuery = {
      ids: drinkCosmosDbSql.items.map(
        (drinkItemCosmosDbSql: DrinkItemCosmosDbSql) =>
          drinkItemCosmosDbSql.liquid_id,
      ),
    };

    const liquidList: Liquid[] = await this.#findLiquidsPort.adapt(
      liquidFindQuery,
    );

    const liquidIdToLiquidMap: Map<string, Liquid> = new Map(
      liquidList.map((liquid: Liquid): [string, Liquid] => [liquid.id, liquid]),
    );

    const drinkItemList: DrinkItem[] = drinkCosmosDbSql.items.map(
      (drinkItemCosmosDbSql: DrinkItemCosmosDbSql): DrinkItem =>
        this.#drinkItemCosmosDbSqlToDrinkItem(
          drinkItemCosmosDbSql,
          liquidIdToLiquidMap,
        ),
    );

    return {
      id: drinkCosmosDbSql.id,
      items: drinkItemList,
      kind: this.#drinkKindCosmosDbSqlToDrinkKindConverter.convert(
        drinkCosmosDbSql.kind,
      ),
      name: drinkCosmosDbSql.name,
    };
  }

  #drinkItemCosmosDbSqlToDrinkItem(
    drinkItemCosmosDbSql: DrinkItemCosmosDbSql,
    liquidIdToLiquidMap: Map<string, Liquid>,
  ): DrinkItem {
    const liquid: Liquid | undefined = liquidIdToLiquidMap.get(
      drinkItemCosmosDbSql.liquid_id,
    );

    if (liquid === undefined) {
      throw new AppError(
        AppErrorKind.unprocessableOperation,
        `Unable to create a drink: no liquid found with id ${drinkItemCosmosDbSql.liquid_id}`,
      );
    }

    return this.#drinkItemCosmosDbSqlToDrinkItemConverter.convert(
      drinkItemCosmosDbSql,
      liquid,
    );
  }
}
