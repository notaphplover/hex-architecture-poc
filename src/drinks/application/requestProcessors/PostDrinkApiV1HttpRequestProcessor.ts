import { Inject, Injectable } from '@nestjs/common';

import { ConverterAsync } from '../../../common/domain/modules/ConverterAsync';
import { AppError } from '../../../errors/application/models/AppError';
import { AppErrorKind } from '../../../errors/application/models/AppErrorKind';
import { RequestWithBody } from '../../../http/application/models/RequestWithBody';
import { RequestProcessor } from '../../../http/application/modules/RequestProcessor';
import { DrinkApiV1 } from '../../application/models/api/v1/DrinkApiV1';
import { DrinkItemApiV1 } from '../../application/models/api/v1/DrinkItemApiV1';
import { DrinkKindApiV1 } from '../../application/models/api/v1/DrinkKindApiV1';
import { DrinkInsertQueryApiV1 } from '../../application/queries/api/v1/DrinkInsertQueryApiV1';
import { DrinkInsertQuery } from '../../application/queries/DrinkInsertQuery';
import { drinksInjectionSymbolsMap } from '../../domain/injection/drinksInjectionSymbolsMap';

@Injectable()
export class PostDrinkApiV1HttpRequestProcessor
  implements RequestProcessor<RequestWithBody, DrinkInsertQuery>
{
  readonly #drinkInsertQueryApiV1ToDrinkInsertQueryConverter: ConverterAsync<
    DrinkInsertQueryApiV1,
    DrinkInsertQuery
  >;

  constructor(
    @Inject(
      drinksInjectionSymbolsMap.drinkInsertQueryApiV1ToDrinkInsertQueryConverter,
    )
    drinkInsertQueryApiV1ToDrinkInsertQueryConverter: ConverterAsync<
      DrinkInsertQueryApiV1,
      DrinkInsertQuery
    >,
  ) {
    this.#drinkInsertQueryApiV1ToDrinkInsertQueryConverter =
      drinkInsertQueryApiV1ToDrinkInsertQueryConverter;
  }

  public async process(request: RequestWithBody): Promise<DrinkInsertQuery> {
    if (this.#isDrinkInsertQueryApiV1(request.body)) {
      const drinkInsertQueryApiV1: DrinkInsertQueryApiV1 = {
        items: request.body.items,
        kind: request.body.kind,
        name: request.body.name,
      };

      return this.#drinkInsertQueryApiV1ToDrinkInsertQueryConverter.convert(
        drinkInsertQueryApiV1,
      );
    } else {
      throw new AppError(AppErrorKind.contractViolation, 'Invalid body');
    }
  }

  #isDrinkInsertQueryApiV1(
    value: Record<string, unknown>,
  ): value is Record<string, unknown> & DrinkInsertQueryApiV1 {
    const valueAsDrinkApiV1: DrinkApiV1 & Record<string, unknown> =
      value as DrinkApiV1 & Record<string, unknown>;

    return (
      Array.isArray(valueAsDrinkApiV1.items) &&
      valueAsDrinkApiV1.items.every((item: DrinkItemApiV1) =>
        this.#isDrinkItemApiV1(item as unknown as Record<string, unknown>),
      ) &&
      Object.values(DrinkKindApiV1).includes(valueAsDrinkApiV1.kind) &&
      typeof valueAsDrinkApiV1.name === 'string'
    );
  }

  #isDrinkItemApiV1(
    value: Record<string, unknown>,
  ): value is Record<string, unknown> & DrinkItemApiV1 {
    const valueAsDrinkItemApiV1: DrinkItemApiV1 & Record<string, unknown> =
      value as DrinkItemApiV1 & Record<string, unknown>;

    return (
      typeof valueAsDrinkItemApiV1.liquid_id === 'string' &&
      typeof valueAsDrinkItemApiV1.milliliters === 'number'
    );
  }
}
