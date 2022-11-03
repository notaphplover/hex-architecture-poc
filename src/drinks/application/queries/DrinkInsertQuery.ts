import { DrinkItem } from '../../domain/models/DrinkItem';
import { DrinkKind } from '../../domain/models/DrinkKind';

export interface DrinkInsertQuery {
  items: DrinkItem[];
  kind: DrinkKind;
  name: string;
}
