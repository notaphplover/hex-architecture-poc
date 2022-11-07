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
import { LiquidFindQuery } from '../queries/LiquidFindQuery';

@Injectable()
export class GetLiquidApiV1RequestController extends HttpSingleEntityRequestController<
  Request,
  LiquidFindQuery,
  Liquid,
  LiquidApiV1
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @Inject(errorInjectionSymbolsMap.errorToResponseConverter)
    errorToResponseConverter: Converter<unknown, ResponseWithBody<unknown>>,
    @Inject(drinksInjectionSymbolsMap.getLiquidApiV1HttpRequestProcessor)
    getLiquidApiV1HttpRequestProcessor: RequestProcessor<
      Request,
      LiquidFindQuery
    >,
    @Inject(drinksInjectionSymbolsMap.findOneLiquidUseCase)
    insertOneLiquidUseCase: UseCase<LiquidFindQuery, Liquid>,
    @Inject(drinksInjectionSymbolsMap.liquidToLiquidApiV1Converter)
    liquidToLiquidApiV1Converter: Converter<Liquid, LiquidApiV1>,
    @Inject(
      httpInjectionSymbolsMap.singleEntityHttpGetResponseCreateQueryToResponseConverter,
    )
    singleEntityHttpGetResponseCreateQueryToResponseConverter: Converter<
      HttpSingleEntityResponseCreateQuery<
        LiquidFindQuery,
        Liquid,
        LiquidApiV1 | undefined
      >,
      Response | ResponseWithBody<LiquidApiV1>
    >,
  ) {
    super(
      errorToResponseConverter,
      getLiquidApiV1HttpRequestProcessor,
      insertOneLiquidUseCase,
      liquidToLiquidApiV1Converter,
      singleEntityHttpGetResponseCreateQueryToResponseConverter,
    );
  }
}
