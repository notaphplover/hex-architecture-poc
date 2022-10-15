import { HttpRequest } from '@azure/functions';

import { Handler } from '../../../../common/application/modules/Handler';
import { Converter } from '../../../../common/domain/modules/Converter';
import { Controller } from '../../../../common/infrastructure/modules/Controller';
import { Request } from '../../../application/models/Request';
import { RequestWithBody } from '../../../application/models/RequestWithBody';
import { RequestProcessor } from '../../../application/modules/RequestProcessor';

export class AzureHttpRequestController<
  TRequest extends Request | RequestWithBody,
  TParams,
  TModel,
  TModelApi,
> implements Controller<HttpRequest, TModelApi>
{
  readonly #azureHttpRequestToRequestConverter: Converter<
    HttpRequest,
    TRequest
  >;
  readonly #requestProcessor: RequestProcessor<TRequest, TParams>;
  readonly #applicationHandler: Handler<TParams, TModel>;
  readonly #modelToModelApiConverter: Converter<TModel, TModelApi>;

  constructor(
    azureHttpRequestToRequestConverter: Converter<HttpRequest, TRequest>,
    requestProcessor: RequestProcessor<TRequest, TParams>,
    applicationHandler: Handler<TParams, TModel>,
    modelToModelApiConverter: Converter<TModel, TModelApi>,
  ) {
    this.#azureHttpRequestToRequestConverter =
      azureHttpRequestToRequestConverter;
    this.#requestProcessor = requestProcessor;
    this.#applicationHandler = applicationHandler;
    this.#modelToModelApiConverter = modelToModelApiConverter;
  }

  public async handle(httpRequest: HttpRequest): Promise<TModelApi> {
    const request: TRequest =
      this.#azureHttpRequestToRequestConverter.convert(httpRequest);
    const params: TParams = await this.#requestProcessor.process(request);
    const model: TModel = await this.#applicationHandler.handle(params);
    const apiModel: TModelApi = this.#modelToModelApiConverter.convert(model);

    return apiModel;
  }
}
