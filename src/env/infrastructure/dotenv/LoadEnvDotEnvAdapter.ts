import { Injectable } from '@nestjs/common';
import dotenv from 'dotenv';

import { LoadEnvPort } from '../../application/LoadEnvPort';

const DOT_ENV_PATH: string = '.env';

@Injectable()
export class LoadEnvDotEnvAdapter implements LoadEnvPort {
  public async adapt(): Promise<void> {
    dotenv.config({
      path: DOT_ENV_PATH,
    });
  }
}
