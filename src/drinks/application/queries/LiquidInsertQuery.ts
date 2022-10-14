import { LiquidKind } from '../../domain/models/LiquidKind';

export interface LiquidInsertQuery {
  kind: LiquidKind;
  name: string;
}
