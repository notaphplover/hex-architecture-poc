import { Module } from '@nestjs/common';

import { SingleEntityHttpGetResponseCreateQueryToResponseConverter } from '../../application/converters/SingleEntityHttpGetResponseCreateQueryToResponseConverter';
import { SingleEntityHttpPostResponseCreateQueryToResponseConverter } from '../../application/converters/SingleEntityHttpPostResponseCreateQueryToResponseConverter';
import { httpInjectionSymbolsMap } from '../../domain/httpInjectionSymbolsMap';
import { AzureHttpRequestToRequestConverter } from '../azure/converters/AzureHttpRequestToRequestConverter';
import { AzureHttpRequestToRequestWithBodyConverter } from '../azure/converters/AzureHttpRequestToRequestWithBodyConverter';
import { HttpResponseCreateQueryToGetResponseWithEntityCreatedConverter } from '../azure/converters/HttpResponseCreateQueryToGetResponseWithEntityCreatedConverter';
import { HttpResponseCreateQueryToPostResponseWithEntityCreatedConverter } from '../azure/converters/HttpResponseCreateQueryToPostResponseWithEntityCreatedConverter';
import { ResponseToAzureHttpResponseConverter } from '../azure/converters/ResponseToAzureHttpResponseConverter';

@Module({
  exports: [
    httpInjectionSymbolsMap.azureHttpRequestToRequestConverter,
    httpInjectionSymbolsMap.azureHttpRequestToRequestWithBodyConverter,
    httpInjectionSymbolsMap.singleEntityHttpGetResponseCreateQueryToResponseConverter,
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
        httpInjectionSymbolsMap.httpResponseCreateQueryToGetResponseWithEntityCreatedConverter,
      useClass: HttpResponseCreateQueryToGetResponseWithEntityCreatedConverter,
    },
    {
      provide:
        httpInjectionSymbolsMap.httpResponseCreateQueryToPostResponseWithEntityCreatedConverter,
      useClass: HttpResponseCreateQueryToPostResponseWithEntityCreatedConverter,
    },
    {
      provide: httpInjectionSymbolsMap.responseToAzureHttpResponseConverter,
      useClass: ResponseToAzureHttpResponseConverter,
    },
    {
      provide:
        httpInjectionSymbolsMap.singleEntityHttpGetResponseCreateQueryToResponseConverter,
      useClass: SingleEntityHttpGetResponseCreateQueryToResponseConverter,
    },
    {
      provide:
        httpInjectionSymbolsMap.singleEntityHttpPostResponseCreateQueryToResponseConverter,
      useClass: SingleEntityHttpPostResponseCreateQueryToResponseConverter,
    },
  ],
})
export class HttpContainerModule {}
