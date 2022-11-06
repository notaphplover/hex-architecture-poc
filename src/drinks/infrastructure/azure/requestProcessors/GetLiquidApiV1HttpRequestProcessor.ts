import { Inject, Injectable } from '@nestjs/common';

import { Converter } from '../../../../common/domain/modules/Converter';
import { AppError } from '../../../../errors/application/models/AppError';
import { AppErrorKind } from '../../../../errors/application/models/AppErrorKind';
import { Request } from '../../../../http/application/models/Request';
import { RequestProcessor } from '../../../../http/application/modules/RequestProcessor';
import { LiquidFindQueryApiV1 } from '../../../application/queries/api/v1/LiquidFindQueryApiV1';
import { LiquidFindQuery } from '../../../application/queries/LiquidFindQuery';
import { drinksInjectionSymbolsMap } from '../../../domain/injection/drinksInjectionSymbolsMap';

@Injectable()
export class GetLiquidApiV1HttpRequestProcessor
  implements RequestProcessor<Request, LiquidFindQuery>
{
  readonly #liquidFindQueryApiV1ToLiquidFindQueryConverter: Converter<
    LiquidFindQueryApiV1,
    LiquidFindQuery
  >;

  constructor(
    @Inject(
      drinksInjectionSymbolsMap.liquidFindQueryApiV1ToLiquidFindQueryConverter,
    )
    liquidFindQueryApiV1ToLiquidFindQueryConverter: Converter<
      LiquidFindQueryApiV1,
      LiquidFindQuery
    >,
  ) {
    this.#liquidFindQueryApiV1ToLiquidFindQueryConverter =
      liquidFindQueryApiV1ToLiquidFindQueryConverter;
  }

  public async process(request: Request): Promise<LiquidFindQuery> {
    if (this.#isLiquidFindQueryApiV1(request.urlParameters)) {
      const liquidInsertQueryApiV1: LiquidFindQueryApiV1 = {
        id: request.urlParameters.id,
      };

      return this.#liquidFindQueryApiV1ToLiquidFindQueryConverter.convert(
        liquidInsertQueryApiV1,
      );
    } else {
      throw new AppError(AppErrorKind.unknown, 'Invalid url parameters');
    }
  }

  #isLiquidFindQueryApiV1(
    value: Record<string, unknown>,
  ): value is LiquidFindQueryApiV1 & Record<string, unknown> {
    const valueAsLiquidFindQueryApiV1: LiquidFindQueryApiV1 &
      Record<string, unknown> = value as LiquidFindQueryApiV1 &
      Record<string, unknown>;

    return typeof valueAsLiquidFindQueryApiV1.id === 'string';
  }
}
