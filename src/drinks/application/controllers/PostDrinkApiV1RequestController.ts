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
import { Drink } from '../../domain/models/Drink';
import { DrinkApiV1 } from '../models/api/v1/DrinkApiV1';
import { DrinkInsertQuery } from '../queries/DrinkInsertQuery';

@Injectable()
export class PostDrinkApiV1RequestController extends HttpSingleEntityRequestController<
  Request,
  DrinkInsertQuery,
  Drink,
  DrinkApiV1
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @Inject(errorInjectionSymbolsMap.errorToResponseConverter)
    errorToResponseConverter: Converter<unknown, ResponseWithBody<unknown>>,
    @Inject(drinksInjectionSymbolsMap.postDrinkApiV1HttpRequestProcessor)
    postDrinkApiV1HttpRequestProcessor: RequestProcessor<
      Request,
      DrinkInsertQuery
    >,
    @Inject(drinksInjectionSymbolsMap.insertOneDrinkUseCase)
    insertOneDrinkUseCase: UseCase<DrinkInsertQuery, Drink>,
    @Inject(drinksInjectionSymbolsMap.drinkToDrinkApiV1Converter)
    drinkToDrinkApiV1Converter: Converter<Drink, DrinkApiV1>,
    @Inject(
      httpInjectionSymbolsMap.singleEntityHttpPostResponseCreateQueryToResponseConverter,
    )
    singleEntityHttpPostResponseCreateQueryToResponseConverter: Converter<
      HttpSingleEntityResponseCreateQuery<DrinkInsertQuery, Drink, DrinkApiV1>,
      Response | ResponseWithBody<DrinkApiV1>
    >,
  ) {
    super(
      errorToResponseConverter,
      postDrinkApiV1HttpRequestProcessor,
      insertOneDrinkUseCase,
      drinkToDrinkApiV1Converter,
      singleEntityHttpPostResponseCreateQueryToResponseConverter,
    );
  }
}
