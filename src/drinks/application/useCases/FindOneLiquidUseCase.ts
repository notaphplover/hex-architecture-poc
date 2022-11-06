import { Inject, Injectable } from '@nestjs/common';

import { UseCase } from '../../../common/application/modules/UseCase';
import { FindOneEntityPort } from '../../../db/application/ports/FindOneEntityPort';
import { drinksInjectionSymbolsMap } from '../../domain/injection/drinksInjectionSymbolsMap';
import { Liquid } from '../../domain/models/Liquid';
import { LiquidFindQuery } from '../queries/LiquidFindQuery';

@Injectable()
export class FindOneLiquidUseCase
  implements UseCase<LiquidFindQuery, Liquid | undefined>
{
  readonly #findOneLiquidPort: FindOneEntityPort<LiquidFindQuery, Liquid>;

  constructor(
    @Inject(drinksInjectionSymbolsMap.findOneLiquidAdapter)
    findOneLiquidPort: FindOneEntityPort<LiquidFindQuery, Liquid>,
  ) {
    this.#findOneLiquidPort = findOneLiquidPort;
  }

  public async handle(
    liquidFindQuery: LiquidFindQuery,
  ): Promise<Liquid | undefined> {
    return this.#findOneLiquidPort.adapt(liquidFindQuery);
  }
}
