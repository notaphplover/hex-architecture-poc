import { LiquidKind } from './LiquidKind';

export interface Liquid {
  id: string;
  kind: LiquidKind;
  name: string;
}
