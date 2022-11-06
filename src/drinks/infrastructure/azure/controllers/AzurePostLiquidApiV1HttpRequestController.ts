import { HttpRequest, HttpResponse } from '@azure/functions';
import { Inject, Injectable } from '@nestjs/common';

import { Port } from '../../../../common/application/modules/Port';
import { UseCase } from '../../../../common/application/modules/UseCase';
import { Converter } from '../../../../common/domain/modules/Converter';
import { errorInjectionSymbolsMap } from '../../../../errors/domain/errorInjectionSymbolsMap';
import { RequestWithBody } from '../../../../http/application/models/RequestWithBody';
import { RequestProcessor } from '../../../../http/application/modules/RequestProcessor';
import { HttpSingleEntityResponseCreateQuery } from '../../../../http/application/query/HttpSingleEntityResponseCreateQuery';
import { httpInjectionSymbolsMap } from '../../../../http/domain/httpInjectionSymbolsMap';
import { AzureHttpSingleEntityRequestController } from '../../../../http/infrastructure/azure/modules/AzureHttpSingleEntityRequestController';
import { LiquidApiV1 } from '../../../application/models/api/v1/LiquidApiV1';
import { LiquidInsertQuery } from '../../../application/queries/LiquidInsertQuery';
import { drinksInjectionSymbolsMap } from '../../../domain/injection/drinksInjectionSymbolsMap';
import { Liquid } from '../../../domain/models/Liquid';

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
    @Inject(drinksInjectionSymbolsMap.insertOneLiquidUseCase)
    insertOneLiquidUseCase: UseCase<LiquidInsertQuery, Liquid>,
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
      insertOneLiquidUseCase,
      liquidToLiquidApiV1Converter,
      httpResponseCreateQueryToResponseConverter,
    );
  }
}
