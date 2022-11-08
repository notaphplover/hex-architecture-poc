import { EntityDb } from '../../../../db/infrastructure/cosmosDbSql/models/EntityDb';
import { DrinkCosmosDbSqlPartitionKey } from './DrinkCosmosDbSqlPartitionKey';
import { DrinkItemCosmosDbSql } from './DrinkItemCosmosDbSql';
import { DrinkKindCosmosDbSql } from './DrinkKindCosmosDbSql';

export interface DrinkCosmosDbSql extends EntityDb<string> {
  items: DrinkItemCosmosDbSql[];
  kind: DrinkKindCosmosDbSql;
  name: string;
  partitionKey: DrinkCosmosDbSqlPartitionKey;
}
