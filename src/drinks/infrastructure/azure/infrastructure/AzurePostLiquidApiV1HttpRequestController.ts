import { HttpRequest, HttpResponse } from '@azure/functions';
import { Inject, Injectable } from '@nestjs/common';

import { Handler } from '../../../../common/application/modules/Handler';
import { Port } from '../../../../common/application/modules/Port';
import { Converter } from '../../../../common/domain/modules/Converter';
import { errorInjectionSymbolsMap } from '../../../../errors/domain/errorInjectionSymbolsMap';
import { RequestWithBody } from '../../../../http/application/models/RequestWithBody';
import { RequestProcessor } from '../../../../http/application/modules/RequestProcessor';
import { HttpSingleEntityResponseCreateQuery } from '../../../../http/application/query/HttpSingleEntityResponseCreateQuery';
import { httpInjectionSymbolsMap } from '../../../../http/domain/httpInjectionSymbolsMap';
import { AzureHttpSingleEntityRequestController } from '../../../../http/infrastructure/azure/modules/AzureHttpSingleEntityRequestController';
import { LiquidInsertQuery } from '../../../application/queries/LiquidInsertQuery';
import { drinksInjectionSymbolsMap } from '../../../domain/injection/drinksInjectionSymbolsMap';
import { Liquid } from '../../../domain/models/Liquid';
import { LiquidApiV1 } from '../../api/v1/models/LiquidApiV1';

@Injectable()
export class AzurePostLiquidApiV1HttpRequestController extends AzureHttpSingleEntityRequestController<
  RequestWithBody,
  LiquidInsertQuery,
  Liquid,
  LiquidApiV1
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @Inject(errorInjectionSymbolsMap.handleErrorPort)
    handleErrorPort: Port<unknown, HttpResponse>,
    @Inject(httpInjectionSymbolsMap.azureHttpRequestToRequestWithBodyConverter)
    azurePostLiquidApiV1HttpRequestToRequestConverter: Converter<
      HttpRequest,
      RequestWithBody
    >,
    @Inject(drinksInjectionSymbolsMap.postLiquidApiV1HttpRequestProcessor)
    postLiquidApiV1HttpRequestProcessor: RequestProcessor<
      RequestWithBody,
      LiquidInsertQuery
    >,
    @Inject(drinksInjectionSymbolsMap.insertOneLiquidHandler)
    insertOneLiquidHandler: Handler<LiquidInsertQuery, Liquid>,
    @Inject(drinksInjectionSymbolsMap.liquidToLiquidApiV1Converter)
    liquidToLiquidApiV1Converter: Converter<Liquid, LiquidApiV1>,
    @Inject(
      httpInjectionSymbolsMap.httpResponseCreateQueryToPostResponseWithEntityCreatedConverter,
    )
    httpResponseCreateQueryToResponseConverter: Converter<
      HttpSingleEntityResponseCreateQuery<
        LiquidInsertQuery,
        Liquid,
        LiquidApiV1
      >,
      HttpResponse
    >,
  ) {
    super(
      handleErrorPort,
      azurePostLiquidApiV1HttpRequestToRequestConverter,
      postLiquidApiV1HttpRequestProcessor,
      insertOneLiquidHandler,
      liquidToLiquidApiV1Converter,
      httpResponseCreateQueryToResponseConverter,
    );
  }
}