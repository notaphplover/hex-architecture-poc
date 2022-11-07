import { Inject, Injectable } from '@nestjs/common';

import { UseCase } from '../../../common/application/modules/UseCase';
import { Converter } from '../../../common/domain/modules/Converter';
import { errorInjectionSymbolsMap } from '../../../errors/domain/errorInjectionSymbolsMap';
import { HttpSingleEntityRequestController } from '../../../http/application/controllers/HttpSingleEntityRequestController';
import { Request } from '../../../http/application/models/Request';
import { Response } from '../../../http/application/models/Response';
import { ResponseWithBody } from '../../../http/application/models/ResponseWithBody';
import { RequestProcessor } from '../../../http/application/modules/RequestProcessor';
import { HttpSingleEntityResponseCreateQuery } from '../../../http/application/query/HttpSingleEntityResponseCreateQuery';
import { httpInjectionSymbolsMap } from '../../../http/domain/httpInjectionSymbolsMap';
import { drinksInjectionSymbolsMap } from '../../domain/injection/drinksInjectionSymbolsMap';
import { Liquid } from '../../domain/models/Liquid';
import { LiquidApiV1 } from '../models/api/v1/LiquidApiV1';
import { LiquidInsertQuery } from '../queries/LiquidInsertQuery';

@Injectable()
export class PostLiquidApiV1RequestController extends HttpSingleEntityRequestController<
  Request,
  LiquidInsertQuery,
  Liquid,
  LiquidApiV1
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @Inject(errorInjectionSymbolsMap.errorToResponseConverter)
    errorToResponseConverter: Converter<unknown, ResponseWithBody<unknown>>,
    @Inject(drinksInjectionSymbolsMap.postLiquidApiV1HttpRequestProcessor)
    getLiquidApiV1HttpRequestProcessor: RequestProcessor<
      Request,
      LiquidInsertQuery
    >,
    @Inject(drinksInjectionSymbolsMap.insertOneLiquidUseCase)
    insertOneLiquidUseCase: UseCase<LiquidInsertQuery, Liquid>,
    @Inject(drinksInjectionSymbolsMap.liquidToLiquidApiV1Converter)
    liquidToLiquidApiV1Converter: Converter<Liquid, LiquidApiV1>,
    @Inject(
      httpInjectionSymbolsMap.singleEntityHttpPostResponseCreateQueryToResponseConverter,
    )
    singleEntityHttpPostResponseCreateQueryToResponseConverter: Converter<
      HttpSingleEntityResponseCreateQuery<
        LiquidInsertQuery,
        Liquid,
        LiquidApiV1
      >,
      Response | ResponseWithBody<LiquidApiV1>
    >,
  ) {
    super(
      errorToResponseConverter,
      getLiquidApiV1HttpRequestProcessor,
      insertOneLiquidUseCase,
      liquidToLiquidApiV1Converter,
      singleEntityHttpPostResponseCreateQueryToResponseConverter,
    );
  }
}
