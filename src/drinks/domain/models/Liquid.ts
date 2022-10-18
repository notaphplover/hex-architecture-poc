import { Entity } from '../../../common/models/Entity';
import { LiquidKind } from './LiquidKind';

export interface Liquid extends Entity<string> {
  kind: LiquidKind;
  name: string;
}
