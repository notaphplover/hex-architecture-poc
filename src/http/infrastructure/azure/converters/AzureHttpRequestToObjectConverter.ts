import { HttpRequest } from '@azure/functions';
import { Injectable } from '@nestjs/common';

import { Converter } from '../../../../common/domain/modules/Converter';

@Injectable()
export class AzureHttpRequestToObjectConverter
  implements Converter<HttpRequest, Record<string, unknown>>
{
  public convert(httpRequest: HttpRequest): Record<string, unknown> {
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
    return httpRequest.headers['Content-Type'] === 'application/json';
  }

  #isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
  }
}
