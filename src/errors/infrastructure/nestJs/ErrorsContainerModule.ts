import { Module } from '@nestjs/common';

import { ErrorToResponseConverter } from '../../application/converters/ErrorToResponseConverter';
import { errorInjectionSymbolsMap } from '../../domain/errorInjectionSymbolsMap';
import { HandleErrorAdapter } from '../azure/adapters/HandleErrorAdapter';

@Module({
  exports: [
    errorInjectionSymbolsMap.errorToResponseConverter,
    errorInjectionSymbolsMap.handleErrorPort,
  ],
  providers: [
    {
      provide: errorInjectionSymbolsMap.errorToResponseConverter,
      useClass: ErrorToResponseConverter,
    },
    {
      provide: errorInjectionSymbolsMap.handleErrorPort,
      useClass: HandleErrorAdapter,
    },
  ],
})
export class ErrorsContainerModule {}
