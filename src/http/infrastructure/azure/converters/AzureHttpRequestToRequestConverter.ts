import { HttpRequest } from '@azure/functions';
import { Injectable } from '@nestjs/common';

import { Request } from '../../../application/models/Request';
import { BaseAzureHttpRequestToRequestConverter } from './BaseAzureHttpRequestToRequestConverter';

@Injectable()
export class AzureHttpRequestToRequestConverter extends BaseAzureHttpRequestToRequestConverter<Request> {
  public convert(httpRequest: HttpRequest): Request {
    return {
      headers: this._convertHeaders(httpRequest),
      query: this._convertQuery(httpRequest),
      urlParameters: this._convertUrlParams(httpRequest),
    };
  }
}
