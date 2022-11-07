import { Injectable } from '@nestjs/common';
import httpStatus from 'http-status';

import { Converter } from '../../../common/domain/modules/Converter';
import { ResponseWithBody } from '../../../http/application/models/ResponseWithBody';
import { AppError } from '../models/AppError';
import { AppErrorKind } from '../models/AppErrorKind';

@Injectable()
export class ErrorToResponseConverter
  implements Converter<unknown, ResponseWithBody<unknown>>
{
  public convert(error: unknown): ResponseWithBody<unknown> {
    let httpResponse: ResponseWithBody<unknown>;

    if (error instanceof Error) {
      httpResponse = this.#buildHttpResponseFromError(error);
    } else {
      httpResponse = this.#buildHttpResponseFromUnexpectedValue();
    }

    return httpResponse;
  }

  #buildHttpResponseFromError(error: Error): ResponseWithBody<unknown> {
    let httpResponse: ResponseWithBody<unknown>;

    if (AppError.isAppError(error)) {
      httpResponse = this.#buildHttpResponseFromAppError(error);
    } else {
      const appError: AppError = new AppError(
        AppErrorKind.unknown,
        error.message,
        {
          cause: error,
        },
      );

      httpResponse = this.#buildHttpResponseFromAppError(appError);
    }

    return httpResponse;
  }

  #buildHttpResponseFromAppError(error: AppError): ResponseWithBody<unknown> {
    let statusCode: number;
    let errorMessage: string;

    switch (error.kind) {
      case AppErrorKind.contractViolation:
        statusCode = httpStatus.BAD_REQUEST;
        errorMessage = this.#stringifyError(error);
        break;
      case AppErrorKind.unknown:
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        errorMessage = this.#stringifyError(error);
        break;
      case AppErrorKind.unprocessableOperation:
        statusCode = httpStatus.UNPROCESSABLE_ENTITY;
        errorMessage = this.#stringifyError(error);
        break;
    }

    return {
      body: {
        error: errorMessage,
      },
      headers: this.#getHttpResponseHeaders(),
      statusCode,
    };
  }

  #buildHttpResponseFromUnexpectedValue(): ResponseWithBody<unknown> {
    return {
      body: {
        error: 'Unexpected error occurred while processing the request.',
      },
      headers: this.#getHttpResponseHeaders(),
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
    };
  }

  #getHttpResponseHeaders(): Record<string, string> {
    return { 'Content-Type': 'application/json' };
  }

  #stringifyError(error: Error): string {
    return error.message;
  }
}
