import { DrinkItemApiV1 } from '../models/DrinkItemApiV1';
import { DrinkKindApiV1 } from '../models/DrinkKindApiV1';

export interface DrinkInsertQueryApiV1 {
  items: DrinkItemApiV1[];
  kind: DrinkKindApiV1;
  name: string;
}
