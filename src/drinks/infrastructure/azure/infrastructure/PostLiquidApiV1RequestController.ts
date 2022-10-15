import { HttpRequest } from '@azure/functions';
import { Inject, Injectable } from '@nestjs/common';

import { Handler } from '../../../../common/application/modules/Handler';
import { Converter } from '../../../../common/domain/modules/Converter';
import { RequestWithBody } from '../../../../http/application/models/RequestWithBody';
import { RequestProcessor } from '../../../../http/application/modules/RequestProcessor';
import { httpInjectionSymbolsMap } from '../../../../http/domain/httpInjectionSymbolsMap';
import { AzureHttpRequestController } from '../../../../http/infrastructure/azure/modules/AzureHttpRequestController';
import { LiquidInsertQuery } from '../../../application/queries/LiquidInsertQuery';
import { drinksInjectionSymbolsMap } from '../../../domain/injection/drinksInjectionSymbolsMap';
import { Liquid } from '../../../domain/models/Liquid';
import { LiquidApiV1 } from '../../api/v1/models/LiquidApiV1';

@Injectable()
export class AzurePostLiquidApiV1HttpRequestController extends AzureHttpRequestController<
  RequestWithBody,
  LiquidInsertQuery,
  Liquid,
  LiquidApiV1
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
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
  ) {
    super(
      azurePostLiquidApiV1HttpRequestToRequestConverter,
      postLiquidApiV1HttpRequestProcessor,
      insertOneLiquidHandler,
      liquidToLiquidApiV1Converter,
    );
  }
}
