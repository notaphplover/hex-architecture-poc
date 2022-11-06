import { HttpRequest, HttpResponse } from '@azure/functions';
import { Inject, Injectable } from '@nestjs/common';

import { Port } from '../../../../common/application/modules/Port';
import { UseCase } from '../../../../common/application/modules/UseCase';
import { Converter } from '../../../../common/domain/modules/Converter';
import { errorInjectionSymbolsMap } from '../../../../errors/domain/errorInjectionSymbolsMap';
import { Request } from '../../../../http/application/models/Request';
import { RequestProcessor } from '../../../../http/application/modules/RequestProcessor';
import { HttpSingleEntityResponseCreateQuery } from '../../../../http/application/query/HttpSingleEntityResponseCreateQuery';
import { httpInjectionSymbolsMap } from '../../../../http/domain/httpInjectionSymbolsMap';
import { AzureHttpSingleEntityRequestController } from '../../../../http/infrastructure/azure/modules/AzureHttpSingleEntityRequestController';
import { DrinkApiV1 } from '../../../application/models/api/v1/DrinkApiV1';
import { DrinkFindQuery } from '../../../application/queries/DrinkFindQuery';
import { drinksInjectionSymbolsMap } from '../../../domain/injection/drinksInjectionSymbolsMap';
import { Drink } from '../../../domain/models/Drink';

@Injectable()
export class AzureGetDrinkApiV1HttpRequestController extends AzureHttpSingleEntityRequestController<
  Request,
  DrinkFindQuery,
  Drink,
  DrinkApiV1
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @Inject(errorInjectionSymbolsMap.handleErrorPort)
    handleErrorPort: Port<unknown, HttpResponse>,
    @Inject(httpInjectionSymbolsMap.azureHttpRequestToRequestConverter)
    azureGetDrinkApiV1HttpRequestToRequestConverter: Converter<
      HttpRequest,
      Request
    >,
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
      httpInjectionSymbolsMap.httpResponseCreateQueryToGetResponseWithEntityCreatedConverter,
    )
    httpResponseCreateQueryToResponseConverter: Converter<
      HttpSingleEntityResponseCreateQuery<
        DrinkFindQuery,
        Drink,
        DrinkApiV1 | undefined
      >,
      HttpResponse
    >,
  ) {
    super(
      handleErrorPort,
      azureGetDrinkApiV1HttpRequestToRequestConverter,
      getDrinkApiV1HttpRequestProcessor,
      insertOneDrinkUseCase,
      drinkToDrinkApiV1Converter,
      httpResponseCreateQueryToResponseConverter,
    );
  }
}
