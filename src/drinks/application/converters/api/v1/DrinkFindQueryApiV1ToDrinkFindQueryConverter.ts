import { Injectable } from '@nestjs/common';

import { Converter } from '../../../../../common/domain/modules/Converter';
import { DrinkFindQueryApiV1 } from '../../../queries/api/v1/DrinkFindQueryApiV1';
import { DrinkFindQuery } from '../../../queries/DrinkFindQuery';

@Injectable()
export class DrinkFindQueryApiV1ToDrinkFindQueryConverter
  implements Converter<DrinkFindQueryApiV1, DrinkFindQuery>
{
  public convert(drinkFindQueryApiV1: DrinkFindQueryApiV1): DrinkFindQuery {
    return {
      ids: [drinkFindQueryApiV1.id],
    };
  }
}
