import { Injectable } from '@nestjs/common';

import { Converter } from '../../../../../common/domain/modules/Converter';
import { DrinkFindQuery } from '../../../../application/queries/DrinkFindQuery';
import { DrinkFindQueryApiV1 } from '../queries/DrinkFindQueryApiV1';

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
