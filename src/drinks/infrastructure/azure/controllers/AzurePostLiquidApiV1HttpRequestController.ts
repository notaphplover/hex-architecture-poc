import { HttpRequest, HttpResponse } from '@azure/functions';
import { Inject, Injectable } from '@nestjs/common';

import { Controller } from '../../../../common/application/modules/Controller';
import { Converter } from '../../../../common/domain/modules/Converter';
import { RequestWithBody } from '../../../../http/application/models/RequestWithBody';
import { Response } from '../../../../http/application/models/Response';
import { ResponseWithBody } from '../../../../http/application/models/ResponseWithBody';
import { httpInjectionSymbolsMap } from '../../../../http/domain/httpInjectionSymbolsMap';
import { AzureRequestController } from '../../../../http/infrastructure/azure/controllers/AzureRequestController';
import { drinksInjectionSymbolsMap } from '../../../domain/injection/drinksInjectionSymbolsMap';

@Injectable()
export class AzurePostLiquidApiV1HttpRequestController extends AzureRequestController {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @Inject(httpInjectionSymbolsMap.azureHttpRequestToRequestWithBodyConverter)
    azureHttpRequestToRequestConverter: Converter<HttpRequest, RequestWithBody>,
    @Inject(drinksInjectionSymbolsMap.postLiquidApiV1RequestController)
    requestController: Controller<
      RequestWithBody,
      Response | ResponseWithBody<unknown>
    >,
    @Inject(httpInjectionSymbolsMap.responseToAzureHttpResponseConverter)
    responseToAzureHttpResponseConverter: Converter<
      Response | ResponseWithBody<unknown>,
      HttpResponse
    >,
  ) {
    super(
      azureHttpRequestToRequestConverter,
      requestController,
      responseToAzureHttpResponseConverter,
    );
  }
}
