import { HttpResponse, HttpResponseHeaders } from '@azure/functions';
import { Injectable } from '@nestjs/common';
import httpStatus from 'http-status';

import { Converter } from '../../../common/domain/modules/Converter';
import { Response } from '../models/Response';
import { ResponseWithBody } from '../models/ResponseWithBody';
import { HttpSingleEntityResponseCreateQuery } from '../query/HttpSingleEntityResponseCreateQuery';

@Injectable()
export class SingleEntityHttpPostResponseCreateQueryToResponseConverter
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
  ): Response | ResponseWithBody<unknown> {
    let httpResponse: Response | ResponseWithBody<unknown>;

    if (httpResponseCreateQuery.modelApi === undefined) {
      httpResponse = {
        headers: this.#getHttpResponseHeaders(),
        statusCode: httpStatus.CREATED,
      };
    } else {
      httpResponse = {
        body: httpResponseCreateQuery.modelApi,
        headers: this.#getHttpResponseHeaders(),
        statusCode: httpStatus.OK,
      };
    }

    return httpResponse;
  }

  #getHttpResponseHeaders(): HttpResponseHeaders {
    return { 'Content-Type': 'application/json' };
  }
}
