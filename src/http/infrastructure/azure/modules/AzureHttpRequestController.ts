import { HttpRequest, HttpResponse } from '@azure/functions';

import { Handler } from '../../../../common/application/modules/Handler';
import { Port } from '../../../../common/application/modules/Port';
import { Converter } from '../../../../common/domain/modules/Converter';
import { Controller } from '../../../../common/infrastructure/modules/Controller';
import { Request } from '../../../application/models/Request';
import { RequestWithBody } from '../../../application/models/RequestWithBody';
import { RequestProcessor } from '../../../application/modules/RequestProcessor';

export interface HttpResponseCreateQuery<TParams, TModel, TModelApi> {
  readonly handlerParams: TParams;
  readonly model: TModel;
  readonly modelApi: TModelApi;
}

export class AzureHttpRequestController<
  TRequest extends Request | RequestWithBody,
  TParams,
  TModel,
  TModelApi,
> implements Controller<HttpRequest, HttpResponse>
{
  readonly #handleErrorPort: Port<unknown, HttpResponse>;
  readonly #azureHttpRequestToRequestConverter: Converter<
    HttpRequest,
    TRequest
  >;
  readonly #requestProcessor: RequestProcessor<TRequest, TParams>;
  readonly #applicationHandler: Handler<TParams, TModel>;
  readonly #modelToModelApiConverter: Converter<TModel, TModelApi>;
  readonly #httpResponseCreateQueryToResponseConverter: Converter<
    HttpResponseCreateQuery<TParams, TModel, TModelApi>,
    HttpResponse
  >;

  constructor(
    handleErrorPort: Port<unknown, HttpResponse>,
    azureHttpRequestToRequestConverter: Converter<HttpRequest, TRequest>,
    requestProcessor: RequestProcessor<TRequest, TParams>,
    applicationHandler: Handler<TParams, TModel>,
    modelToModelApiConverter: Converter<TModel, TModelApi>,
    httpResponseGenerationParamsToResponseConverter: Converter<
      HttpResponseCreateQuery<TParams, TModel, TModelApi>,
      HttpResponse
    >,
  ) {
    this.#handleErrorPort = handleErrorPort;
    this.#azureHttpRequestToRequestConverter =
      azureHttpRequestToRequestConverter;
    this.#requestProcessor = requestProcessor;
    this.#applicationHandler = applicationHandler;
    this.#modelToModelApiConverter = modelToModelApiConverter;
    this.#httpResponseCreateQueryToResponseConverter =
      httpResponseGenerationParamsToResponseConverter;
  }

  public async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const request: TRequest =
        this.#azureHttpRequestToRequestConverter.convert(httpRequest);
      const params: TParams = await this.#requestProcessor.process(request);
      const model: TModel = await this.#applicationHandler.handle(params);
      const modelApi: TModelApi = this.#modelToModelApiConverter.convert(model);

      const httpResponse: HttpResponse =
        this.#httpResponseCreateQueryToResponseConverter.convert({
          handlerParams: params,
          model,
          modelApi: modelApi,
        });

      return httpResponse;
    } catch (error: unknown) {
      return this.#handleErrorPort.adapt(error);
    }
  }
}
