import { HttpRequest } from '@azure/functions';
import { Injectable } from '@nestjs/common';

import { RequestWithBody } from '../../../application/models/RequestWithBody';
import { BaseAzureHttpRequestToRequestConverter } from './BaseAzureHttpRequestToRequestConverter';

@Injectable()
export class AzureHttpRequestToRequestWithBodyConverter extends BaseAzureHttpRequestToRequestConverter<RequestWithBody> {
  public convert(httpRequest: HttpRequest): RequestWithBody {
    const requestWithBody: RequestWithBody = {
      body: this.#convertBodyToObject(httpRequest),
      headers: this._convertHeaders(httpRequest),
      query: this._convertQuery(httpRequest),
      urlParameters: this._convertUrlParams(httpRequest),
    };

    return requestWithBody;
  }

  #convertBodyToObject(httpRequest: HttpRequest): Record<string, unknown> {
    if (
      this.#hasJsonContentType(httpRequest) &&
      this.#isObject(httpRequest.body) &&
      !Buffer.isBuffer(httpRequest.body)
    ) {
      return httpRequest.body;
    } else {
      throw new Error('Expecting a JSON body');
    }
  }

  #hasJsonContentType(httpRequest: HttpRequest): boolean {
    return httpRequest.headers['content-type'] === 'application/json';
  }

  #isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
  }
}
