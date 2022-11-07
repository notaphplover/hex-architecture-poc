import { HttpResponse } from '@azure/functions';
import { Injectable } from '@nestjs/common';

import { Converter } from '../../../../common/domain/modules/Converter';
import { Response } from '../../../application/models/Response';
import { ResponseWithBody } from '../../../application/models/ResponseWithBody';

@Injectable()
export class ResponseToAzureHttpResponseConverter
  implements Converter<Response | ResponseWithBody<unknown>, HttpResponse>
{
  public convert(response: Response | ResponseWithBody<unknown>): HttpResponse {
    const httpResponse: HttpResponse = {
      headers: response.headers,
      status: response.statusCode,
    };

    if ((response as ResponseWithBody<unknown>).body !== undefined) {
      httpResponse.body = (response as ResponseWithBody<unknown>).body;
    }

    return httpResponse;
  }
}
