import { Entity } from '../../../common/models/Entity';
import { DrinkItem } from './DrinkItem';

export interface Drink extends Entity<string> {
  items: DrinkItem[];
  name: string;
}
