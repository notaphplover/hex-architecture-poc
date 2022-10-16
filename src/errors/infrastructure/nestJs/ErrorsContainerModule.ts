import { Module } from '@nestjs/common';

import { errorInjectionSymbolsMap } from '../../domain/errorInjectionSymbolsMap';
import { HandleErrorAdapter } from '../azure/adapters/HandleErrorAdapter';

@Module({
  exports: [errorInjectionSymbolsMap.handleErrorPort],
  providers: [
    {
      provide: errorInjectionSymbolsMap.handleErrorPort,
      useClass: HandleErrorAdapter,
    },
  ],
})
export class ErrorsContainerModule {}
