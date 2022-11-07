import { Module } from '@nestjs/common';

import { GetHttpResponseCreateQueryToResponseConverter } from '../../application/converters/GetHttpResponseCreateQueryToResponseConverter';
import { httpInjectionSymbolsMap } from '../../domain/httpInjectionSymbolsMap';
import { AzureHttpRequestToRequestConverter } from '../azure/converters/AzureHttpRequestToRequestConverter';
import { AzureHttpRequestToRequestWithBodyConverter } from '../azure/converters/AzureHttpRequestToRequestWithBodyConverter';
import { HttpResponseCreateQueryToGetResponseWithEntityCreatedConverter } from '../azure/converters/HttpResponseCreateQueryToGetResponseWithEntityCreatedConverter';
import { HttpResponseCreateQueryToPostResponseWithEntityCreatedConverter } from '../azure/converters/HttpResponseCreateQueryToPostResponseWithEntityCreatedConverter';

@Module({
  exports: [
    httpInjectionSymbolsMap.azureHttpRequestToRequestConverter,
    httpInjectionSymbolsMap.azureHttpRequestToRequestWithBodyConverter,
    httpInjectionSymbolsMap.getHttpResponseCreateQueryToResponseConverter,
    httpInjectionSymbolsMap.httpResponseCreateQueryToGetResponseWithEntityCreatedConverter,
    httpInjectionSymbolsMap.httpResponseCreateQueryToPostResponseWithEntityCreatedConverter,
  ],
  providers: [
    {
      provide: httpInjectionSymbolsMap.azureHttpRequestToRequestConverter,
      useClass: AzureHttpRequestToRequestConverter,
    },
    {
      provide:
        httpInjectionSymbolsMap.azureHttpRequestToRequestWithBodyConverter,
      useClass: AzureHttpRequestToRequestWithBodyConverter,
    },
    {
      provide:
        httpInjectionSymbolsMap.getHttpResponseCreateQueryToResponseConverter,
      useClass: GetHttpResponseCreateQueryToResponseConverter,
    },
    {
      provide:
        httpInjectionSymbolsMap.httpResponseCreateQueryToGetResponseWithEntityCreatedConverter,
      useClass: HttpResponseCreateQueryToGetResponseWithEntityCreatedConverter,
    },
    {
      provide:
        httpInjectionSymbolsMap.httpResponseCreateQueryToPostResponseWithEntityCreatedConverter,
      useClass: HttpResponseCreateQueryToPostResponseWithEntityCreatedConverter,
    },
  ],
})
export class HttpContainerModule {}
