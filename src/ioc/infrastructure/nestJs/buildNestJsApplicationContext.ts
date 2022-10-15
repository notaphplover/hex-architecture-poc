import { INestApplicationContext, Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { DrinksContainerModule } from '../../../drinks/infrastructure/nestJs/injection/DrinksContainerModule';

@Module({
  imports: [DrinksContainerModule],
})
class ContainerModule {}

export async function buildNestJsApplicationContext(): Promise<INestApplicationContext> {
  const nestJsApplicationContext: INestApplicationContext =
    await NestFactory.createApplicationContext(ContainerModule);

  return nestJsApplicationContext;
}
