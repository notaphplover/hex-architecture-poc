import { HttpRequest } from '@azure/functions';

import { Converter } from '../../../../common/domain/modules/Converter';
import { Request } from '../../../application/models/Request';

export abstract class BaseAzureHttpRequestToRequestConverter<
  TRequest extends Request,
> implements Converter<HttpRequest, Request>
{
  protected _convertHeaders(request: HttpRequest): Record<string, string> {
    return {
      ...request.headers,
    };
  }
  protected _convertQuery(request: HttpRequest): Record<string, string> {
    return {
      ...request.query,
    };
  }
  protected _convertUrlParams(request: HttpRequest): Record<string, string> {
    return request.params;
  }

  public abstract convert(httpRequest: HttpRequest): TRequest;
}
