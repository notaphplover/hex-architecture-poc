import { HttpResponse } from '@azure/functions';
import { Injectable } from '@nestjs/common';
import httpStatus from 'http-status';

import { Port } from '../../../../common/application/modules/Port';
import { AppError } from '../../../application/models/AppError';
import { AppErrorKind } from '../../../application/models/AppErrorKind';

@Injectable()
export class HandleErrorAdapter implements Port<unknown, HttpResponse> {
  public async adapt(error: unknown): Promise<HttpResponse> {
    let httpResponse: HttpResponse;

    if (error instanceof Error) {
      httpResponse = this.#buildHttpResponseFromError(error);
    } else {
      httpResponse = this.#buildHttpResponseFromUnexpectedValue();
    }

    return httpResponse;
  }

  #buildHttpResponseFromError(error: Error): HttpResponse {
    let httpResponse: HttpResponse;

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

  #buildHttpResponseFromAppError(error: AppError): HttpResponse {
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
    }

    return {
      body: {
        error: errorMessage,
      },
      headers: { 'Content-Type': 'application/json' },
      status: statusCode,
    };
  }

  #buildHttpResponseFromUnexpectedValue(): HttpResponse {
    return {
      body: {
        error: 'Unexpected error occurred while processing the request.',
      },
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    };
  }

  #stringifyError(error: Error): string {
    return error.message;
  }
}
