import { DrinkItemApiV1 } from './DrinkItemApiV1';
import { DrinkKindApiV1 } from './DrinkKindApiV1';

export interface Drink {
  id: string;
  items: DrinkItemApiV1[];
  kind: DrinkKindApiV1;
  name: string;
}
