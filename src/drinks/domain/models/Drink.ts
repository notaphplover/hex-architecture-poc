import { DrinkItem } from './DrinkItem';

export interface Drink {
  id: string;
  items: DrinkItem[];
  name: string;
}
