import { Module } from '@nestjs/common';

import { httpInjectionSymbolsMap } from '../../domain/httpInjectionSymbolsMap';
import { AzureHttpRequestToRequestConverter } from '../azure/converters/AzureHttpRequestToRequestConverter';
import { AzureHttpRequestToRequestWithBodyConverter } from '../azure/converters/AzureHttpRequestToRequestWithBodyConverter';

@Module({
  exports: [
    httpInjectionSymbolsMap.azureHttpRequestToRequestConverter,
    httpInjectionSymbolsMap.azureHttpRequestToRequestWithBodyConverter,
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
  ],
})
export class HttpContainerModule {}
