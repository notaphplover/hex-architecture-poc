import { Port } from '../../../common/application/modules/Port';

export type FindEntitiesPort<TQuery, TEntity> = Port<TQuery, TEntity[]>;
