import { Controller } from '../../../common/application/modules/Controller';
import { Port } from '../../../common/application/modules/Port';
import { UseCase } from '../../../common/application/modules/UseCase';
import { Converter } from '../../../common/domain/modules/Converter';
import { Request } from '../../application/models/Request';
import { RequestWithBody } from '../../application/models/RequestWithBody';
import { RequestProcessor } from '../../application/modules/RequestProcessor';
import { HttpSingleEntityResponseCreateQuery } from '../../application/query/HttpSingleEntityResponseCreateQuery';
import { Response } from '../models/Response';
import { ResponseWithBody } from '../models/ResponseWithBody';

export class AzureHttpSingleEntityRequestController<
  TRequest extends Request | RequestWithBody,
  TResponse extends Response | ResponseWithBody<TModelApi>,
  TParams,
  TModel,
  TModelApi,
> implements Controller<TRequest, TResponse>
{
  readonly #handleErrorPort: Port<unknown, TResponse>;
  readonly #requestProcessor: RequestProcessor<TRequest, TParams>;
  readonly #applicationUseCase: UseCase<TParams, TModel | undefined>;
  readonly #modelToModelApiConverter: Converter<TModel, TModelApi>;
  readonly #httpResponseCreateQueryToResponseConverter: Converter<
    HttpSingleEntityResponseCreateQuery<TParams, TModel, TModelApi>,
    TResponse
  >;

  constructor(
    handleErrorPort: Port<unknown, TResponse>,
    requestProcessor: RequestProcessor<TRequest, TParams>,
    applicationUseCase: UseCase<TParams, TModel | undefined>,
    modelToModelApiConverter: Converter<TModel, TModelApi>,
    httpResponseCreateQueryToResponseConverter: Converter<
      HttpSingleEntityResponseCreateQuery<TParams, TModel, TModelApi>,
      TResponse
    >,
  ) {
    this.#handleErrorPort = handleErrorPort;
    this.#requestProcessor = requestProcessor;
    this.#applicationUseCase = applicationUseCase;
    this.#modelToModelApiConverter = modelToModelApiConverter;
    this.#httpResponseCreateQueryToResponseConverter =
      httpResponseCreateQueryToResponseConverter;
  }

  public async handle(httpRequest: TRequest): Promise<TResponse> {
    try {
      const params: TParams = await this.#requestProcessor.process(httpRequest);
      const modelOrUndefined: TModel | undefined =
        await this.#applicationUseCase.handle(params);

      let httpResponseCreateQuery: HttpSingleEntityResponseCreateQuery<
        TParams,
        TModel,
        TModelApi
      >;

      if (modelOrUndefined === undefined) {
        httpResponseCreateQuery = {
          model: modelOrUndefined,
          modelApi: undefined,
          useCaseParams: params,
        };
      } else {
        const modelApi: TModelApi =
          this.#modelToModelApiConverter.convert(modelOrUndefined);

        httpResponseCreateQuery = {
          model: modelOrUndefined,
          modelApi: modelApi,
          useCaseParams: params,
        };
      }

      const httpResponse: TResponse =
        this.#httpResponseCreateQueryToResponseConverter.convert(
          httpResponseCreateQuery,
        );

      return httpResponse;
    } catch (error: unknown) {
      return this.#handleErrorPort.adapt(error);
    }
  }
}
