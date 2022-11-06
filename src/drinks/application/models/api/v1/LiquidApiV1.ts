import { LiquidKindApiV1 } from '../../../../application/models/api/v1/LiquidKindApiV1';

export interface LiquidApiV1 {
  id: string;
  kind: LiquidKindApiV1;
  name: string;
}
