import { Module } from '@nestjs/common';

import { SingleEntityHttpGetResponseCreateQueryToResponseConverter } from '../../application/converters/SingleEntityHttpGetResponseCreateQueryToResponseConverter';
import { httpInjectionSymbolsMap } from '../../domain/httpInjectionSymbolsMap';
import { AzureHttpRequestToRequestConverter } from '../azure/converters/AzureHttpRequestToRequestConverter';
import { AzureHttpRequestToRequestWithBodyConverter } from '../azure/converters/AzureHttpRequestToRequestWithBodyConverter';
import { HttpResponseCreateQueryToGetResponseWithEntityCreatedConverter } from '../azure/converters/HttpResponseCreateQueryToGetResponseWithEntityCreatedConverter';
import { HttpResponseCreateQueryToPostResponseWithEntityCreatedConverter } from '../azure/converters/HttpResponseCreateQueryToPostResponseWithEntityCreatedConverter';

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
      provide:
        httpInjectionSymbolsMap.singleEntityHttpGetResponseCreateQueryToResponseConverter,
      useClass: SingleEntityHttpGetResponseCreateQueryToResponseConverter,
    },
  ],
})
export class HttpContainerModule {}
