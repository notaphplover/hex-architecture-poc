import { Module } from '@nestjs/common';

import { LoadEnvPort } from '../../application/LoadEnvPort';
import { envInjectionSymbolsMap } from '../../domain/envInjectionSymbolsMap';
import { LoadEnvDotEnvAdapter } from '../dotenv/LoadEnvDotEnvAdapter';

@Module({
  exports: [envInjectionSymbolsMap.envLoaded],
  providers: [
    {
      inject: [envInjectionSymbolsMap.loadEnvPort],
      provide: envInjectionSymbolsMap.envLoaded,
      useFactory: async (loadEnvPort: LoadEnvPort): Promise<void> =>
        loadEnvPort.adapt(),
    },
    {
      provide: envInjectionSymbolsMap.loadEnvPort,
      useClass: LoadEnvDotEnvAdapter,
    },
  ],
})
export class EnvContainerModuler {}
