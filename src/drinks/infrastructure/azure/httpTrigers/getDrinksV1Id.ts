import { Context, HttpRequest, HttpResponse } from '@azure/functions';
import { INestApplicationContext } from '@nestjs/common';

import { Controller } from '../../../../common/infrastructure/modules/Controller';
import { nestJsApplicationContextPromise } from '../../../../ioc/infrastructure/nestJs/nestApplicationContextPromise';
import { drinksInjectionSymbolsMap } from '../../../domain/injection/drinksInjectionSymbolsMap';

async function run(context: Context): Promise<HttpResponse> {
  const nestJsApplicationContext: INestApplicationContext =
    await nestJsApplicationContextPromise;

  const request: HttpRequest = context.req as HttpRequest;

  const azureGetDrinkApiV1HttpRequestController: Controller<
    HttpRequest,
    HttpResponse
  > = nestJsApplicationContext.get(
    drinksInjectionSymbolsMap.getDrinkApiV1HttpRequestController,
  );

  const httpResponse: HttpResponse =
    await azureGetDrinkApiV1HttpRequestController.handle(request);

  return httpResponse;
}

export default run;