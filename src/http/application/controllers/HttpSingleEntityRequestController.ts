import { Controller } from '../../../common/application/modules/Controller';
import { Port } from '../../../common/application/modules/Port';
import { UseCase } from '../../../common/application/modules/UseCase';
import { Converter } from '../../../common/domain/modules/Converter';
import { Request } from '../models/Request';
import { RequestWithBody } from '../models/RequestWithBody';
import { Response } from '../models/Response';
import { ResponseWithBody } from '../models/ResponseWithBody';
import { RequestProcessor } from '../modules/RequestProcessor';
import { HttpSingleEntityResponseCreateQuery } from '../query/HttpSingleEntityResponseCreateQuery';

export class HttpSingleEntityRequestController<
  TRequest extends Request | RequestWithBody,
  TParams,
  TModel,
  TModelApi,
> implements Controller<TRequest, Response | ResponseWithBody<unknown>>
{
  readonly #handleErrorPort: Port<
    unknown,
    Response | ResponseWithBody<unknown>
  >;
  readonly #requestProcessor: RequestProcessor<TRequest, TParams>;
  readonly #applicationUseCase: UseCase<TParams, TModel | undefined>;
  readonly #modelToModelApiConverter: Converter<TModel, TModelApi>;
  readonly #httpResponseCreateQueryToResponseConverter: Converter<
    HttpSingleEntityResponseCreateQuery<TParams, TModel, TModelApi>,
    Response | ResponseWithBody<TModelApi>
  >;

  constructor(
    handleErrorPort: Port<unknown, Response | ResponseWithBody<unknown>>,
    requestProcessor: RequestProcessor<TRequest, TParams>,
    applicationUseCase: UseCase<TParams, TModel | undefined>,
    modelToModelApiConverter: Converter<TModel, TModelApi>,
    httpResponseCreateQueryToResponseConverter: Converter<
      HttpSingleEntityResponseCreateQuery<TParams, TModel, TModelApi>,
      Response | ResponseWithBody<TModelApi>
    >,
  ) {
    this.#handleErrorPort = handleErrorPort;
    this.#requestProcessor = requestProcessor;
    this.#applicationUseCase = applicationUseCase;
    this.#modelToModelApiConverter = modelToModelApiConverter;
    this.#httpResponseCreateQueryToResponseConverter =
      httpResponseCreateQueryToResponseConverter;
  }

  public async handle(
    httpRequest: TRequest,
  ): Promise<Response | ResponseWithBody<unknown>> {
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

      const httpResponse: Response | ResponseWithBody<TModelApi> =
        this.#httpResponseCreateQueryToResponseConverter.convert(
          httpResponseCreateQuery,
        );

      return httpResponse;
    } catch (error: unknown) {
      return this.#handleErrorPort.adapt(error);
    }
  }
}
