import { Module } from '@nestjs/common';

import { SingleEntityHttpGetResponseCreateQueryToResponseConverter } from '../../application/converters/SingleEntityHttpGetResponseCreateQueryToResponseConverter';
import { SingleEntityHttpPostResponseCreateQueryToResponseConverter } from '../../application/converters/SingleEntityHttpPostResponseCreateQueryToResponseConverter';
import { httpInjectionSymbolsMap } from '../../domain/httpInjectionSymbolsMap';
import { AzureHttpRequestToRequestConverter } from '../azure/converters/AzureHttpRequestToRequestConverter';
import { AzureHttpRequestToRequestWithBodyConverter } from '../azure/converters/AzureHttpRequestToRequestWithBodyConverter';
import { ResponseToAzureHttpResponseConverter } from '../azure/converters/ResponseToAzureHttpResponseConverter';

@Module({
  exports: [
    httpInjectionSymbolsMap.azureHttpRequestToRequestConverter,
    httpInjectionSymbolsMap.azureHttpRequestToRequestWithBodyConverter,
    httpInjectionSymbolsMap.responseToAzureHttpResponseConverter,
    httpInjectionSymbolsMap.singleEntityHttpGetResponseCreateQueryToResponseConverter,
    httpInjectionSymbolsMap.singleEntityHttpPostResponseCreateQueryToResponseConverter,
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
