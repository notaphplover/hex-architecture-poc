import { Context, HttpRequest } from '@azure/functions';
import { INestApplicationContext } from '@nestjs/common';

import { Handler } from '../../../../common/application/modules/Handler';
import { nestJsApplicationContextPromise } from '../../../../ioc/infrastructure/nestJs/nestApplicationContextPromise';
import { LiquidInsertQuery } from '../../../application/queries/LiquidInsertQuery';
import { drinksInjectionSymbolsMap } from '../../../domain/injection/drinksInjectionSymbolsMap';
import { Liquid } from '../../../domain/models/Liquid';

export async function run(context: Context): Promise<Record<string, unknown>> {
  const nestJsApplicationContext: INestApplicationContext =
    await nestJsApplicationContextPromise;

  const request: HttpRequest = context.req as HttpRequest;

  const body = request.body;

  const insertOneLiquidHandler: Handler<LiquidInsertQuery, Liquid> =
    nestJsApplicationContext.get(
      drinksInjectionSymbolsMap.insertOneLiquidHandler,
    );

  return {
    body: 'hi!',
  };
}

function parseBody(body: unknown) {}
