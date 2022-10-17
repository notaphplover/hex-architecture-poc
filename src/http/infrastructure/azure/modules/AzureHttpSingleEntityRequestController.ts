import { HttpRequest, HttpResponse } from '@azure/functions';

import { Handler } from '../../../../common/application/modules/Handler';
import { Port } from '../../../../common/application/modules/Port';
import { Converter } from '../../../../common/domain/modules/Converter';
import { Controller } from '../../../../common/infrastructure/modules/Controller';
import { Request } from '../../../application/models/Request';
import { RequestWithBody } from '../../../application/models/RequestWithBody';
import { RequestProcessor } from '../../../application/modules/RequestProcessor';
import { HttpSingleEntityResponseCreateQuery } from '../../../application/query/HttpSingleEntityResponseCreateQuery';

export class AzureHttpSingleEntityRequestController<
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
  readonly #applicationHandler: Handler<TParams, TModel | undefined>;
  readonly #modelToModelApiConverter: Converter<TModel, TModelApi>;
  readonly #httpResponseCreateQueryToResponseConverter: Converter<
    HttpSingleEntityResponseCreateQuery<TParams, TModel, TModelApi>,
    HttpResponse
  >;

  constructor(
    handleErrorPort: Port<unknown, HttpResponse>,
    azureHttpRequestToRequestConverter: Converter<HttpRequest, TRequest>,
    requestProcessor: RequestProcessor<TRequest, TParams>,
    applicationHandler: Handler<TParams, TModel | undefined>,
    modelToModelApiConverter: Converter<TModel, TModelApi>,
    httpResponseGenerationParamsToResponseConverter: Converter<
      HttpSingleEntityResponseCreateQuery<TParams, TModel, TModelApi>,
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
      const modelOrUndefined: TModel | undefined =
        await this.#applicationHandler.handle(params);

      let httpResponseCreateQuery: HttpSingleEntityResponseCreateQuery<
        TParams,
        TModel,
        TModelApi
      >;

      if (modelOrUndefined === undefined) {
        httpResponseCreateQuery = {
          handlerParams: params,
          model: modelOrUndefined,
          modelApi: undefined,
        };
      } else {
        const modelApi: TModelApi =
          this.#modelToModelApiConverter.convert(modelOrUndefined);

        httpResponseCreateQuery = {
          handlerParams: params,
          model: modelOrUndefined,
          modelApi: modelApi,
        };
      }

      const httpResponse: HttpResponse =
        this.#httpResponseCreateQueryToResponseConverter.convert(
          httpResponseCreateQuery,
        );

      return httpResponse;
    } catch (error: unknown) {
      return this.#handleErrorPort.adapt(error);
    }
  }
}
