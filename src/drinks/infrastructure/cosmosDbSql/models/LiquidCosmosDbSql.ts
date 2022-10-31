import { EntityDb } from '../../../../db/infrastructure/cosmosDbSql/models/EntityDb';
import { LiquidKindCosmosDbSql } from './LiquidKindCosmosDbSql';

export interface LiquidCosmosDbSql extends EntityDb<string> {
  kind: LiquidKindCosmosDbSql;
  name: string;
}
