import { FeedOptions } from '@azure/cosmos';
import { Injectable } from '@nestjs/common';

import { Converter } from '../../../../common/domain/modules/Converter';
import { DrinkFindQuery } from '../../../application/queries/DrinkFindQuery';
import { DrinkCosmosDbSqlPartitionKey } from '../models/DrinkCosmosDbSqlPartitionKey';

const PARTITION_KEY: DrinkCosmosDbSqlPartitionKey = 'partition-key';

@Injectable()
export class DrinkFindQueryToCosmosDbSqlFeedOptionsConverter
  implements Converter<DrinkFindQuery, FeedOptions>
{
  public convert(): FeedOptions {
    // Consider https://learn.microsoft.com/en-us/dotnet/api/microsoft.azure.documents.client.feedoptions.maxitemcount?view=azure-dotnet#remarks as refrence.
    const noMaxItemsCount: number = -1;

    return {
      maxItemCount: noMaxItemsCount,
      partitionKey: PARTITION_KEY,
    };
  }
}
