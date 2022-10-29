import { Injectable } from '@nestjs/common';
import { cleanEnv, str } from 'envalid';

import { Builder } from '../../../../common/domain/modules/Builder';
import { CosmosDbSqlConfig } from '../../cosmosDbSql/models/CosmosDbSqlConfig';

interface CosmosDbSqlEnvVariables {
  COSMOS_DB_SQL_ENDPOINT: string;
  COSMOS_DB_SQL_KEY: string;
}

@Injectable()
export class CosmosDbSqlConfigEnvalidBuilder
  implements Builder<CosmosDbSqlConfig>
{
  public build(): CosmosDbSqlConfig {
    const cosmosDbEnvVariables: Readonly<CosmosDbSqlEnvVariables> =
      cleanEnv<CosmosDbSqlEnvVariables>(process.env, {
        COSMOS_DB_SQL_ENDPOINT: str(),
        COSMOS_DB_SQL_KEY: str(),
      });

    const cosmosDbConfig: CosmosDbSqlConfig = {
      endpoint: cosmosDbEnvVariables.COSMOS_DB_SQL_ENDPOINT,
      key: cosmosDbEnvVariables.COSMOS_DB_SQL_KEY,
    };

    return cosmosDbConfig;
  }
}
