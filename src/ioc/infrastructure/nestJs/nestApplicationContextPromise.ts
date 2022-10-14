import { INestApplicationContext } from '@nestjs/common';

import { buildNestJsApplicationContext } from './buildNestJsApplicationContext';

export const nestJsApplicationContextPromise: Promise<INestApplicationContext> =
  buildNestJsApplicationContext();
