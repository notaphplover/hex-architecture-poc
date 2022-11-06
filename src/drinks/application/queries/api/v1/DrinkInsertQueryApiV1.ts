import { DrinkItemApiV1 } from '../../../models/api/v1/DrinkItemApiV1';
import { DrinkKindApiV1 } from '../../../models/api/v1/DrinkKindApiV1';

export interface DrinkInsertQueryApiV1 {
  items: DrinkItemApiV1[];
  kind: DrinkKindApiV1;
  name: string;
}
