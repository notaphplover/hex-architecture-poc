import { HttpResponse, HttpResponseHeaders } from '@azure/functions';
import { Injectable } from '@nestjs/common';
import httpStatus from 'http-status';

import { Converter } from '../../../../common/domain/modules/Converter';
import { HttpSingleEntityResponseCreateQuery } from '../../../application/query/HttpSingleEntityResponseCreateQuery';

@Injectable()
export class HttpResponseCreateQueryToGetResponseWithEntityCreatedConverter
  implements
    Converter<
      HttpSingleEntityResponseCreateQuery<unknown, unknown, unknown>,
      HttpResponse
    >
{
  public convert(
    httpResponseCreateQuery: HttpSingleEntityResponseCreateQuery<
      unknown,
      unknown,
      unknown
    >,
  ): HttpResponse {
    let httpResponse: HttpResponse;

    if (httpResponseCreateQuery.modelApi === undefined) {
      httpResponse = {
        headers: this.#getHttpResponseHeaders(),
        status: httpStatus.NOT_FOUND,
      };
    } else {
      httpResponse = {
        body: httpResponseCreateQuery.modelApi,
        headers: this.#getHttpResponseHeaders(),
        status: httpStatus.OK,
      };
    }

    return httpResponse;
  }

  #getHttpResponseHeaders(): HttpResponseHeaders {
    return { 'Content-Type': 'application/json' };
  }
}
