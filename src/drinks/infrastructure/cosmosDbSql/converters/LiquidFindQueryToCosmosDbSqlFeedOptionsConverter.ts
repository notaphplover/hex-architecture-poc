import { FeedOptions } from '@azure/cosmos';
import { Injectable } from '@nestjs/common';

import { Converter } from '../../../../common/domain/modules/Converter';
import { LiquidFindQuery } from '../../../application/queries/LiquidFindQuery';
import { LiquidCosmosDbSqlPartitionKey } from '../models/LiquidCosmosDbSqlPartitionKey';

const PARTITION_KEY: LiquidCosmosDbSqlPartitionKey = 'partition-key';

@Injectable()
export class LiquidFindQueryToCosmosDbSqlFeedOptionsConverter
  implements Converter<LiquidFindQuery, FeedOptions>
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
