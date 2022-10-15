import { Context, HttpRequest, HttpResponse } from '@azure/functions';
import { INestApplicationContext } from '@nestjs/common';

import { Controller } from '../../../../common/infrastructure/modules/Controller';
import { nestJsApplicationContextPromise } from '../../../../ioc/infrastructure/nestJs/nestApplicationContextPromise';
import { drinksInjectionSymbolsMap } from '../../../domain/injection/drinksInjectionSymbolsMap';
import { LiquidApiV1 } from '../../api/v1/models/LiquidApiV1';

async function run(context: Context): Promise<HttpResponse> {
  const nestJsApplicationContext: INestApplicationContext =
    await nestJsApplicationContextPromise;

  const request: HttpRequest = context.req as HttpRequest;

  const azurePostLiquidApiV1HttpRequestController: Controller<
    HttpRequest,
    LiquidApiV1
  > = nestJsApplicationContext.get(
    drinksInjectionSymbolsMap.postLiquidApiV1HttpRequestController,
  );

  const liquidApiV1: LiquidApiV1 =
    await azurePostLiquidApiV1HttpRequestController.handle(request);

  return {
    body: liquidApiV1,
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  };
}

export default run;
