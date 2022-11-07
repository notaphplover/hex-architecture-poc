import { Inject, Injectable } from '@nestjs/common';

import { Port } from '../../../common/application/modules/Port';
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
import { Drink } from '../../domain/models/Drink';
import { DrinkApiV1 } from '../models/api/v1/DrinkApiV1';
import { DrinkFindQuery } from '../queries/DrinkFindQuery';

@Injectable()
export class GetDrinkApiV1RequestController extends HttpSingleEntityRequestController<
  Request,
  DrinkFindQuery,
  Drink,
  DrinkApiV1
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @Inject(errorInjectionSymbolsMap.handleErrorPort)
    handleErrorPort: Port<unknown, ResponseWithBody<unknown>>,
    @Inject(drinksInjectionSymbolsMap.getDrinkApiV1HttpRequestProcessor)
    getDrinkApiV1HttpRequestProcessor: RequestProcessor<
      Request,
      DrinkFindQuery
    >,
    @Inject(drinksInjectionSymbolsMap.findOneDrinkUseCase)
    insertOneDrinkUseCase: UseCase<DrinkFindQuery, Drink>,
    @Inject(drinksInjectionSymbolsMap.drinkToDrinkApiV1Converter)
    drinkToDrinkApiV1Converter: Converter<Drink, DrinkApiV1>,
    @Inject(
      httpInjectionSymbolsMap.singleEntityHttpGetResponseCreateQueryToResponseConverter,
    )
    singleEntityHttpGetResponseCreateQueryToResponseConverter: Converter<
      HttpSingleEntityResponseCreateQuery<
        DrinkFindQuery,
        Drink,
        DrinkApiV1 | undefined
      >,
      Response | ResponseWithBody<DrinkApiV1>
    >,
  ) {
    super(
      handleErrorPort,
      getDrinkApiV1HttpRequestProcessor,
      insertOneDrinkUseCase,
      drinkToDrinkApiV1Converter,
      singleEntityHttpGetResponseCreateQueryToResponseConverter,
    );
  }
}
