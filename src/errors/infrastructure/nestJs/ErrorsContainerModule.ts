import { Module } from '@nestjs/common';

import { ErrorToResponseConverter } from '../../application/converters/ErrorToResponseConverter';
import { errorInjectionSymbolsMap } from '../../domain/errorInjectionSymbolsMap';

@Module({
  exports: [errorInjectionSymbolsMap.errorToResponseConverter],
  providers: [
    {
      provide: errorInjectionSymbolsMap.errorToResponseConverter,
      useClass: ErrorToResponseConverter,
    },
  ],
})
export class ErrorsContainerModule {}
