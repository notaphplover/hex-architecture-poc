import { EntityDb } from '../models/EntityDb';
import { MapKey } from '../models/MapKey';

export type InsertQuery<TEntity extends EntityDb = EntityDb> =
  | TEntity
  | Omit<TEntity, 'id'>;

export type SingleFilter<TEntity> = {
  [P in keyof TEntity]?: ValueFilter<TEntity[P]>;
};

export interface FindQuery<TEntity extends EntityDb = EntityDb> {
  filters: Partial<TEntity>;
  paginationOptions?: FindQueryPaginationOptions;
}

export interface FindOneQuery<TEntity extends EntityDb = EntityDb> {
  filters: Partial<TEntity>;
}

export interface IntersectionFilter<TValue> {
  kind: MultipleFilterKind.intersection;
  filters: ValueFilter<TValue>[];
}

export enum MultipleFilterKind {
  intersection = 'intersection',
  union = 'union',
}

export type MultipleValueFilter<TValue> =
  | IntersectionFilter<TValue>
  | UnionFilter<TValue>;

export interface UnionFilter<TValue> {
  kind: MultipleFilterKind.union;
  filters: ValueFilter<TValue>[];
}

export type ValueFilter<TValue> = TValue | MultipleValueFilter<TValue>;

export interface FindQueryPaginationOptions {
  limit: number;
  offset: number;
}

export type UpdateQuery<TEntity extends EntityDb = EntityDb> = Partial<TEntity>;

export abstract class BaseEntityMemoryPersistenceService<
  TEntity extends EntityDb<TKey>,
  TKey extends MapKey = MapKey,
> {
  readonly #entitiesMap: Map<TKey, TEntity>;

  constructor() {
    this.#entitiesMap = new Map();
  }

  public delete(id: TKey): void {
    this.#removeById(id);
  }

  public insert(query: InsertQuery<TEntity>): TEntity {
    const entity: TEntity = this.#insertQueryToEntity(query);

    this.#persistEntity(entity);

    return entity;
  }

  public find(findQuery: FindQuery<TEntity>): TEntity[] {
    const filteredEntities: TEntity[] = this.#findByFilters(findQuery.filters);

    return this.#extractPage(filteredEntities, findQuery.paginationOptions);
  }

  public findOne(findOneQuery: FindOneQuery<TEntity>): TEntity | undefined {
    return this.#findByFilters(findOneQuery.filters)[0];
  }

  public update(id: TKey, query: UpdateQuery<TEntity>): void {
    const entityToUpdate: TEntity | undefined = this.#findById(id)[0];

    if (entityToUpdate !== undefined) {
      const updatedEntity: TEntity = {
        ...entityToUpdate,
        ...query,
      };

      this.#persistEntity(updatedEntity);
    }
  }

  #filterEntity(entity: TEntity, filter: Partial<TEntity>) {
    for (const key in filter) {
      if (Object.prototype.hasOwnProperty.call(filter, key)) {
        if (entity[key] !== filter[key]) {
          return false;
        }
      }
    }

    return true;
  }

  #getEntitiesToFilter(filters: Partial<TEntity>): TEntity[] {
    let entitiesToFilter: TEntity[];

    if (filters.id === undefined) {
      entitiesToFilter = [...this.#entitiesMap.values()];
    } else {
      entitiesToFilter = this.#findById(filters.id);
    }

    return entitiesToFilter;
  }

  #extractPage(
    entities: TEntity[],
    paginationOptions?: FindQueryPaginationOptions,
  ): TEntity[] {
    const startIndex: number = paginationOptions?.offset ?? 0;
    const endIndex: number | undefined =
      paginationOptions?.offset === undefined
        ? undefined
        : startIndex + paginationOptions.offset;

    return entities.slice(startIndex, endIndex);
  }

  #findById(id: TKey): [TEntity] | [] {
    const entity: TEntity | undefined = this.#entitiesMap.get(id);

    let entities: [TEntity] | [];

    if (entity === undefined) {
      entities = [];
    } else {
      entities = [entity];
    }

    return entities;
  }

  #findByFilters(filters: Partial<TEntity>): TEntity[] {
    return this.#getEntitiesToFilter(filters).filter(
      (entity: TEntity): boolean => this.#filterEntity(entity, filters),
    );
  }

  #insertQueryToEntity(query: InsertQuery<TEntity>): TEntity {
    const entityToCreate: InsertQuery<TEntity> = { ...query };

    if ((entityToCreate as TEntity).id === undefined) {
      (entityToCreate as TEntity).id = this.generateId();
    }

    return entityToCreate as TEntity;
  }

  #persistEntity(entity: TEntity): void {
    this.#entitiesMap.set(entity.id, entity);
  }

  #removeById(id: TKey): void {
    this.#entitiesMap.delete(id);
  }

  protected abstract generateId(): TKey;
}
