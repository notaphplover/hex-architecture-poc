import { HttpRequest, HttpResponse } from '@azure/functions';
import { Inject, Injectable } from '@nestjs/common';

import { Handler } from '../../../../common/application/modules/Handler';
import { Port } from '../../../../common/application/modules/Port';
import { Converter } from '../../../../common/domain/modules/Converter';
import { errorInjectionSymbolsMap } from '../../../../errors/domain/errorInjectionSymbolsMap';
import { Request } from '../../../../http/application/models/Request';
import { RequestProcessor } from '../../../../http/application/modules/RequestProcessor';
import { HttpSingleEntityResponseCreateQuery } from '../../../../http/application/query/HttpSingleEntityResponseCreateQuery';
import { httpInjectionSymbolsMap } from '../../../../http/domain/httpInjectionSymbolsMap';
import { AzureHttpSingleEntityRequestController } from '../../../../http/infrastructure/azure/modules/AzureHttpSingleEntityRequestController';
import { LiquidFindQuery } from '../../../application/queries/LiquidFindQuery';
import { drinksInjectionSymbolsMap } from '../../../domain/injection/drinksInjectionSymbolsMap';
import { Liquid } from '../../../domain/models/Liquid';
import { LiquidApiV1 } from '../../api/v1/models/LiquidApiV1';

@Injectable()
export class AzureGetLiquidApiV1HttpRequestController extends AzureHttpSingleEntityRequestController<
  Request,
  LiquidFindQuery,
  Liquid,
  LiquidApiV1
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @Inject(errorInjectionSymbolsMap.handleErrorPort)
    handleErrorPort: Port<unknown, HttpResponse>,
    @Inject(httpInjectionSymbolsMap.azureHttpRequestToRequestConverter)
    azureGetLiquidApiV1HttpRequestToRequestConverter: Converter<
      HttpRequest,
      Request
    >,
    @Inject(drinksInjectionSymbolsMap.getLiquidApiV1HttpRequestProcessor)
    getLiquidApiV1HttpRequestProcessor: RequestProcessor<
      Request,
      LiquidFindQuery
    >,
    @Inject(drinksInjectionSymbolsMap.findOneLiquidHandler)
    insertOneLiquidHandler: Handler<LiquidFindQuery, Liquid>,
    @Inject(drinksInjectionSymbolsMap.liquidToLiquidApiV1Converter)
    liquidToLiquidApiV1Converter: Converter<Liquid, LiquidApiV1>,
    @Inject(
      httpInjectionSymbolsMap.httpResponseCreateQueryToGetResponseWithEntityCreatedConverter,
    )
    httpResponseCreateQueryToResponseConverter: Converter<
      HttpSingleEntityResponseCreateQuery<
        LiquidFindQuery,
        Liquid,
        LiquidApiV1 | undefined
      >,
      HttpResponse
    >,
  ) {
    super(
      handleErrorPort,
      azureGetLiquidApiV1HttpRequestToRequestConverter,
      getLiquidApiV1HttpRequestProcessor,
      insertOneLiquidHandler,
      liquidToLiquidApiV1Converter,
      httpResponseCreateQueryToResponseConverter,
    );
  }
}
