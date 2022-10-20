import { EntityDb } from '../../../../db/infrastructure/memory/models/EntityDb';
import { LiquidKindDb } from './LiquidKindDb';

export interface LiquidDb extends EntityDb<string> {
  kind: LiquidKindDb;
  name: string;
}
