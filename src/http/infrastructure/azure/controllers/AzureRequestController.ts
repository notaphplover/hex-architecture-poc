import { HttpRequest, HttpResponse } from '@azure/functions';

import { Controller } from '../../../../common/application/modules/Controller';
import { Converter } from '../../../../common/domain/modules/Converter';
import { Request } from '../../../application/models/Request';
import { RequestWithBody } from '../../../application/models/RequestWithBody';
import { Response } from '../../../application/models/Response';
import { ResponseWithBody } from '../../../application/models/ResponseWithBody';

export class AzureRequestController
  implements Controller<HttpRequest, HttpResponse>
{
  readonly #azureHttpRequestToRequestConverter: Converter<
    HttpRequest,
    Request | RequestWithBody
  >;

  readonly #requestController: Controller<
    Request | RequestWithBody,
    Response | ResponseWithBody<unknown>
  >;

  readonly #responseToAzureHttpResponseConverter: Converter<
    Response | ResponseWithBody<unknown>,
    HttpResponse
  >;

  constructor(
    azureHttpRequestToRequestConverter: Converter<
      HttpRequest,
      Request | RequestWithBody
    >,
    requestController: Controller<
      Request | RequestWithBody,
      Response | ResponseWithBody<unknown>
    >,
    responseToAzureHttpResponseConverter: Converter<
      Response | ResponseWithBody<unknown>,
      HttpResponse
    >,
  ) {
    this.#azureHttpRequestToRequestConverter =
      azureHttpRequestToRequestConverter;
    this.#requestController = requestController;
    this.#responseToAzureHttpResponseConverter =
      responseToAzureHttpResponseConverter;
  }

  public async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const request: Request | RequestWithBody =
      this.#azureHttpRequestToRequestConverter.convert(httpRequest);

    const response: Response | ResponseWithBody<unknown> =
      await this.#requestController.handle(request);

    const httpResponse: HttpResponse =
      this.#responseToAzureHttpResponseConverter.convert(response);

    return httpResponse;
  }
}
