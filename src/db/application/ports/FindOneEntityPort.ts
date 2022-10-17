import { Port } from '../../../common/application/modules/Port';

export type FindOneEntityPort<TQuery, TEntity> = Port<
  TQuery,
  TEntity | undefined
>;
