import { Inject, Injectable } from '@nestjs/common';

import { Converter } from '../../../../common/domain/modules/Converter';
import { AppError } from '../../../../errors/application/models/AppError';
import { AppErrorKind } from '../../../../errors/application/models/AppErrorKind';
import { Request } from '../../../../http/application/models/Request';
import { RequestProcessor } from '../../../../http/application/modules/RequestProcessor';
import { DrinkFindQuery } from '../../../application/queries/DrinkFindQuery';
import { drinksInjectionSymbolsMap } from '../../../domain/injection/drinksInjectionSymbolsMap';
import { DrinkFindQueryApiV1 } from '../../api/v1/queries/DrinkFindQueryApiV1';

@Injectable()
export class GetDrinkApiV1HttpRequestProcessor
  implements RequestProcessor<Request, DrinkFindQuery>
{
  readonly #drinkFindQueryApiV1ToDrinkFindQueryConverter: Converter<
    DrinkFindQueryApiV1,
    DrinkFindQuery
  >;

  constructor(
    @Inject(
      drinksInjectionSymbolsMap.drinkFindQueryApiV1ToDrinkFindQueryConverter,
    )
    drinkFindQueryApiV1ToDrinkFindQueryConverter: Converter<
      DrinkFindQueryApiV1,
      DrinkFindQuery
    >,
  ) {
    this.#drinkFindQueryApiV1ToDrinkFindQueryConverter =
      drinkFindQueryApiV1ToDrinkFindQueryConverter;
  }

  public async process(request: Request): Promise<DrinkFindQuery> {
    if (this.#isDrinkFindQueryApiV1(request.urlParameters)) {
      const drinkInsertQueryApiV1: DrinkFindQueryApiV1 = {
        id: request.urlParameters.id,
      };

      return this.#drinkFindQueryApiV1ToDrinkFindQueryConverter.convert(
        drinkInsertQueryApiV1,
      );
    } else {
      throw new AppError(AppErrorKind.unknown, 'Invalid url parameters');
    }
  }

  #isDrinkFindQueryApiV1(
    value: Record<string, unknown>,
  ): value is DrinkFindQueryApiV1 & Record<string, unknown> {
    const valueAsDrinkFindQueryApiV1: DrinkFindQueryApiV1 &
      Record<string, unknown> = value as DrinkFindQueryApiV1 &
      Record<string, unknown>;

    return typeof valueAsDrinkFindQueryApiV1.id === 'string';
  }
}
