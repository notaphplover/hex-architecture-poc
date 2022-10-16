import { HttpResponse } from '@azure/functions';
import { Injectable } from '@nestjs/common';

import { Converter } from '../../../../common/domain/modules/Converter';
import { HttpResponseCreateQuery } from '../modules/AzureHttpRequestController';

@Injectable()
export class HttpResponseCreateQueryToPostResponseWithEntityCreatedConverter
  implements
    Converter<HttpResponseCreateQuery<unknown, unknown, unknown>, HttpResponse>
{
  public convert(
    httpResponseCreateQuery: HttpResponseCreateQuery<unknown, unknown, unknown>,
  ): HttpResponse {
    return {
      body: httpResponseCreateQuery.modelApi,
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    };
  }
}
