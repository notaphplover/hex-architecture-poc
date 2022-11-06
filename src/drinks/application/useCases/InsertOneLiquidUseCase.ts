import { Inject, Injectable } from '@nestjs/common';

import { UseCase } from '../../../common/application/modules/UseCase';
import { InsertOneEntityPort } from '../../../db/application/ports/InsertOneEntityPort';
import { drinksInjectionSymbolsMap } from '../../domain/injection/drinksInjectionSymbolsMap';
import { Liquid } from '../../domain/models/Liquid';
import { LiquidInsertQuery } from '../queries/LiquidInsertQuery';

@Injectable()
export class InsertOneLiquidUseCase
  implements UseCase<LiquidInsertQuery, Liquid>
{
  readonly #insertOneLiquidPort: InsertOneEntityPort<LiquidInsertQuery, Liquid>;

  constructor(
    @Inject(drinksInjectionSymbolsMap.insertOneLiquidAdapter)
    insertOneLiquidPort: InsertOneEntityPort<LiquidInsertQuery, Liquid>,
  ) {
    this.#insertOneLiquidPort = insertOneLiquidPort;
  }

  public async handle(liquidInsertQuery: LiquidInsertQuery): Promise<Liquid> {
    return this.#insertOneLiquidPort.adapt(liquidInsertQuery);
  }
}
