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
import { DrinkApiV1 } from '../../../application/models/api/v1/DrinkApiV1';
import { DrinkInsertQuery } from '../../../application/queries/DrinkInsertQuery';
import { drinksInjectionSymbolsMap } from '../../../domain/injection/drinksInjectionSymbolsMap';
import { Drink } from '../../../domain/models/Drink';

@Injectable()
export class AzurePostDrinkApiV1HttpRequestController extends AzureHttpSingleEntityRequestController<
  RequestWithBody,
  DrinkInsertQuery,
  Drink,
  DrinkApiV1
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @Inject(errorInjectionSymbolsMap.handleErrorPort)
    handleErrorPort: Port<unknown, HttpResponse>,
    @Inject(httpInjectionSymbolsMap.azureHttpRequestToRequestWithBodyConverter)
    azurePostDrinkApiV1HttpRequestToRequestConverter: Converter<
      HttpRequest,
      RequestWithBody
    >,
    @Inject(drinksInjectionSymbolsMap.postDrinkApiV1HttpRequestProcessor)
    postDrinkApiV1HttpRequestProcessor: RequestProcessor<
      RequestWithBody,
      DrinkInsertQuery
    >,
    @Inject(drinksInjectionSymbolsMap.insertOneDrinkUseCase)
    insertOneDrinkUseCase: UseCase<DrinkInsertQuery, Drink>,
    @Inject(drinksInjectionSymbolsMap.drinkToDrinkApiV1Converter)
    drinkToDrinkApiV1Converter: Converter<Drink, DrinkApiV1>,
    @Inject(
      httpInjectionSymbolsMap.httpResponseCreateQueryToPostResponseWithEntityCreatedConverter,
    )
    httpResponseCreateQueryToResponseConverter: Converter<
      HttpSingleEntityResponseCreateQuery<DrinkInsertQuery, Drink, DrinkApiV1>,
      HttpResponse
    >,
  ) {
    super(
      handleErrorPort,
      azurePostDrinkApiV1HttpRequestToRequestConverter,
      postDrinkApiV1HttpRequestProcessor,
      insertOneDrinkUseCase,
      drinkToDrinkApiV1Converter,
      httpResponseCreateQueryToResponseConverter,
    );
  }
}
