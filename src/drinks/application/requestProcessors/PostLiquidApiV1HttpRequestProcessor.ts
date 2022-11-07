import { Inject, Injectable } from '@nestjs/common';

import { Converter } from '../../../common/domain/modules/Converter';
import { AppError } from '../../../errors/application/models/AppError';
import { AppErrorKind } from '../../../errors/application/models/AppErrorKind';
import { RequestWithBody } from '../../../http/application/models/RequestWithBody';
import { RequestProcessor } from '../../../http/application/modules/RequestProcessor';
import { LiquidKindApiV1 } from '../../application/models/api/v1/LiquidKindApiV1';
import { LiquidInsertQueryApiV1 } from '../../application/queries/api/v1/LiquidInsertQueryApiV1';
import { LiquidInsertQuery } from '../../application/queries/LiquidInsertQuery';
import { drinksInjectionSymbolsMap } from '../../domain/injection/drinksInjectionSymbolsMap';

@Injectable()
export class PostLiquidApiV1HttpRequestProcessor
  implements RequestProcessor<RequestWithBody, LiquidInsertQuery>
{
  readonly #liquidInsertQueryApiV1ToLiquidInsertQueryConverter: Converter<
    LiquidInsertQueryApiV1,
    LiquidInsertQuery
  >;

  constructor(
    @Inject(
      drinksInjectionSymbolsMap.liquidInsertQueryApiV1ToLiquidInsertQueryConverter,
    )
    liquidInsertQueryApiV1ToLiquidInsertQueryConverter: Converter<
      LiquidInsertQueryApiV1,
      LiquidInsertQuery
    >,
  ) {
    this.#liquidInsertQueryApiV1ToLiquidInsertQueryConverter =
      liquidInsertQueryApiV1ToLiquidInsertQueryConverter;
  }

  public async process(request: RequestWithBody): Promise<LiquidInsertQuery> {
    if (this.#isLiquidInsertQueryApiV1(request.body)) {
      const liquidInsertQueryApiV1: LiquidInsertQueryApiV1 = {
        kind: request.body.kind,
        name: request.body.name,
      };

      return this.#liquidInsertQueryApiV1ToLiquidInsertQueryConverter.convert(
        liquidInsertQueryApiV1,
      );
    } else {
      throw new AppError(AppErrorKind.contractViolation, 'Invalid body');
    }
  }

  #isLiquidInsertQueryApiV1(
    value: Record<string, unknown>,
  ): value is Record<string, unknown> & LiquidInsertQueryApiV1 {
    const valueAsLiquidInsertQueryApiV1: LiquidInsertQueryApiV1 &
      Record<string, unknown> = value as LiquidInsertQueryApiV1 &
      Record<string, unknown>;

    return (
      Object.values(LiquidKindApiV1).includes(
        valueAsLiquidInsertQueryApiV1.kind,
      ) && typeof valueAsLiquidInsertQueryApiV1.name === 'string'
    );
  }
}
