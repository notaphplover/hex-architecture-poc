import { EntityDb } from '../../../../db/infrastructure/memory/models/EntityDb';
import { DrinkItemDb } from './DrinkItemDb';

export interface Drink extends EntityDb<string> {
  items: DrinkItemDb[];
  name: string;
}
