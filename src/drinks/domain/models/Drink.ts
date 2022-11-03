import { Entity } from '../../../common/domain/models/Entity';
import { DrinkItem } from './DrinkItem';
import { DrinkKind } from './DrinkKind';

export interface Drink extends Entity<string> {
  items: DrinkItem[];
  kind: DrinkKind;
  name: string;
}
