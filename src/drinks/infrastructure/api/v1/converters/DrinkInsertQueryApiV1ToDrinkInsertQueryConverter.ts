import { Inject, Injectable } from '@nestjs/common';

import { Converter } from '../../../../../common/domain/modules/Converter';
import { ConverterAsync } from '../../../../../common/domain/modules/ConverterAsync';
import { FindEntitiesPort } from '../../../../../db/application/ports/FindEntititesPort';
import { AppError } from '../../../../../errors/application/models/AppError';
import { AppErrorKind } from '../../../../../errors/application/models/AppErrorKind';
import { DrinkInsertQuery } from '../../../../application/queries/DrinkInsertQuery';
import { LiquidFindQuery } from '../../../../application/queries/LiquidFindQuery';
import { drinksInjectionSymbolsMap } from '../../../../domain/injection/drinksInjectionSymbolsMap';
import { DrinkItem } from '../../../../domain/models/DrinkItem';
import { DrinkKind } from '../../../../domain/models/DrinkKind';
import { Liquid } from '../../../../domain/models/Liquid';
import { DrinkItemApiV1 } from '../models/DrinkItemApiV1';
import { DrinkKindApiV1 } from '../models/DrinkKindApiV1';
import { DrinkInsertQueryApiV1 } from '../queries/DrinkInsertQueryApiV1';

@Injectable()
export class DrinkInsertQueryApiV1ToDrinkInsertQueryConverter
  implements ConverterAsync<DrinkInsertQueryApiV1, DrinkInsertQuery>
{
  readonly #drinkItemApiV1ToDrinkItemConverter: Converter<
    DrinkItemApiV1,
    DrinkItem,
    Liquid
  >;
  readonly #drinkKindApiV1ToDrinkKindConverter: Converter<
    DrinkKindApiV1,
    DrinkKind
  >;

  readonly #findLiquidsPort: FindEntitiesPort<LiquidFindQuery, Liquid>;

  constructor(
    @Inject(drinksInjectionSymbolsMap.drinkItemApiV1ToDrinkItemConverter)
    drinkItemApiV1ToDrinkItemConverter: Converter<
      DrinkItemApiV1,
      DrinkItem,
      Liquid
    >,
    @Inject(drinksInjectionSymbolsMap.drinkKindApiV1ToDrinkKindConverter)
    drinkKindApiV1ToDrinkKindConverter: Converter<DrinkKindApiV1, DrinkKind>,
    @Inject(drinksInjectionSymbolsMap.findLiquidsAdapter)
    findLiquidsPort: FindEntitiesPort<LiquidFindQuery, Liquid>,
  ) {
    this.#drinkItemApiV1ToDrinkItemConverter =
      drinkItemApiV1ToDrinkItemConverter;
    this.#drinkKindApiV1ToDrinkKindConverter =
      drinkKindApiV1ToDrinkKindConverter;

    this.#findLiquidsPort = findLiquidsPort;
  }

  public async convert(
    drinkInsertQueryApiV1: DrinkInsertQueryApiV1,
  ): Promise<DrinkInsertQuery> {
    const drinkItemList: DrinkItem[] = await this.#buildDrinkItemList(
      drinkInsertQueryApiV1,
    );

    return {
      items: drinkItemList,
      kind: this.#drinkKindApiV1ToDrinkKindConverter.convert(
        drinkInsertQueryApiV1.kind,
      ),
      name: drinkInsertQueryApiV1.name,
    };
  }

  async #buildDrinkItemList(
    drinkInsertQueryApiV1: DrinkInsertQueryApiV1,
  ): Promise<DrinkItem[]> {
    const liquidFindQuery: LiquidFindQuery = {
      ids: drinkInsertQueryApiV1.items.map(
        (drinkItemApiV1: DrinkItemApiV1) => drinkItemApiV1.liquid_id,
      ),
    };

    const liquidList: Liquid[] = await this.#findLiquidsPort.adapt(
      liquidFindQuery,
    );

    const liquidIdToLiquidMap: Map<string, Liquid> = new Map(
      liquidList.map((liquid: Liquid): [string, Liquid] => [liquid.id, liquid]),
    );

    return drinkInsertQueryApiV1.items.map(
      (drinkItemApiV1: DrinkItemApiV1): DrinkItem =>
        this.#drinkItemCosmosDbSqlToDrinkItem(
          drinkItemApiV1,
          liquidIdToLiquidMap,
        ),
    );
  }

  #drinkItemCosmosDbSqlToDrinkItem(
    drinkItemApiV1: DrinkItemApiV1,
    liquidIdToLiquidMap: Map<string, Liquid>,
  ): DrinkItem {
    const liquid: Liquid | undefined = liquidIdToLiquidMap.get(
      drinkItemApiV1.liquid_id,
    );

    if (liquid === undefined) {
      throw new AppError(
        AppErrorKind.unprocessableOperation,
        `Unable to create a drink: no liquid found with id ${drinkItemApiV1.liquid_id}`,
      );
    }

    return this.#drinkItemApiV1ToDrinkItemConverter.convert(
      drinkItemApiV1,
      liquid,
    );
  }
}
