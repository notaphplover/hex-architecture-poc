import { EntityDb } from '../models/EntityDb';
import { Filter } from '../models/Filter';
import { FindOneQuery } from '../models/FindOneQuery';
import { FindQuery } from '../models/FindQuery';
import { FindQueryPaginationOptions } from '../models/FindQueryPaginationOptions';
import { InsertQuery } from '../models/InsertQuery';
import { MultipleFilter } from '../models/MultipleFilter';
import { MultipleFilterKind } from '../models/MultipleFilterKind';
import { MultipleValueFilter } from '../models/MultipleValueFilter';
import { SingleFilter } from '../models/SingleFilter';
import { UpdateQuery } from '../models/UpdateQuery';
import { ValueFilter } from '../models/ValueFilter';

type EntityKey<TEntity extends EntityDb> = TEntity['id'];

export abstract class BaseEntityMemoryPersistenceService<
  TEntity extends EntityDb,
> {
  readonly #entitiesMap: Map<EntityKey<TEntity>, TEntity>;

  constructor() {
    this.#entitiesMap = new Map();
  }

  public delete(id: EntityKey<TEntity>): void {
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

  public update(id: EntityKey<TEntity>, query: UpdateQuery<TEntity>): void {
    const entityToUpdate: TEntity | undefined = this.#findById(id)[0];

    if (entityToUpdate !== undefined) {
      const updatedEntity: TEntity = {
        ...entityToUpdate,
        ...query,
      };

      this.#persistEntity(updatedEntity);
    }
  }

  #filterEntityByFilter(entity: TEntity, filter: Filter<TEntity>): boolean {
    if (this.#isMultipleFilter(filter)) {
      return this.#filterEntityByMultipleFilter(entity, filter);
    } else {
      return this.#filterEntityBySingleFilter(entity, filter);
    }
  }

  #filterEntityBySingleFilter(
    entity: TEntity,
    singleFilter: SingleFilter<TEntity>,
  ): boolean {
    for (const key in singleFilter) {
      if (Object.prototype.hasOwnProperty.call(singleFilter, key)) {
        const valueFilter: ValueFilter<unknown> = singleFilter[key];

        if (this.#isMultipleValueFilter(valueFilter)) {
          if (
            !this.#filterValueByMultipleValueFilter(entity[key], valueFilter)
          ) {
            return false;
          }
        } else {
          if (entity[key] !== singleFilter[key]) {
            return false;
          }
        }
      }
    }

    return true;
  }

  #filterEntityByMultipleFilter(
    entity: TEntity,
    multipleFilter: MultipleFilter<TEntity>,
  ): boolean {
    let isValid: boolean;

    switch (multipleFilter.kind) {
      case MultipleFilterKind.intersection:
        isValid = true;

        for (const filter of multipleFilter.filters) {
          if (!this.#filterEntityByFilter(entity, filter)) {
            return false;
          }
        }

        break;
      case MultipleFilterKind.union:
        isValid = false;

        for (const filter of multipleFilter.filters) {
          if (this.#filterEntityByFilter(entity, filter)) {
            return true;
          }
        }

        break;
    }

    return isValid;
  }

  #filterValueByValueFilter<T>(value: T, valueFilter: ValueFilter<T>): boolean {
    let result: boolean;

    if (this.#isMultipleValueFilter(valueFilter)) {
      result = this.#filterValueByMultipleValueFilter(value, valueFilter);
    } else {
      result = value === valueFilter;
    }

    return result;
  }

  #filterValueByMultipleValueFilter<T>(
    value: T,
    multipleValueFilter: MultipleValueFilter<T>,
  ): boolean {
    let result: boolean;

    switch (multipleValueFilter.kind) {
      case MultipleFilterKind.intersection:
        result = true;
        for (const filter of multipleValueFilter.filters) {
          if (!this.#filterValueByValueFilter(value, filter)) {
            result = false;
            break;
          }
        }
        break;
      case MultipleFilterKind.union:
        result = false;
        for (const filter of multipleValueFilter.filters) {
          if (this.#filterValueByValueFilter(value, filter)) {
            result = true;
            break;
          }
        }
        break;
    }

    return result;
  }

  #getEntitiesToFilter(filters: Filter<TEntity>): TEntity[] {
    let entitiesToFilter: TEntity[];

    if (this.#isMultipleFilter(filters)) {
      entitiesToFilter = [...this.#entitiesMap.values()];
    } else {
      if (filters.id === undefined) {
        entitiesToFilter = [...this.#entitiesMap.values()];
      } else {
        if (this.#isMultipleValueFilter(filters.id)) {
          entitiesToFilter = [...this.#entitiesMap.values()];
        } else {
          entitiesToFilter = this.#findById(filters.id);
        }
      }
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

  #findById(id: EntityKey<TEntity>): [TEntity] | [] {
    const entity: TEntity | undefined = this.#entitiesMap.get(id);

    let entities: [TEntity] | [];

    if (entity === undefined) {
      entities = [];
    } else {
      entities = [entity];
    }

    return entities;
  }

  #findByFilters(filters: Filter<TEntity>): TEntity[] {
    return this.#getEntitiesToFilter(filters).filter(
      (entity: TEntity): boolean => this.#filterEntityByFilter(entity, filters),
    );
  }

  #insertQueryToEntity(query: InsertQuery<TEntity>): TEntity {
    const entityToCreate: InsertQuery<TEntity> = { ...query };

    if ((entityToCreate as TEntity).id === undefined) {
      (entityToCreate as TEntity).id = this.generateId();
    }

    return entityToCreate as TEntity;
  }

  #isMultipleFilter<T>(value: Filter<T>): value is MultipleFilter<T> {
    return Object.values(MultipleFilterKind).includes(
      (value as MultipleFilter<T>).kind,
    );
  }

  #isMultipleValueFilter<T>(
    value: ValueFilter<T>,
  ): value is MultipleValueFilter<T> {
    return Object.values(MultipleFilterKind).includes(
      (value as MultipleValueFilter<T>).kind,
    );
  }

  #persistEntity(entity: TEntity): void {
    this.#entitiesMap.set(entity.id, entity);
  }

  #removeById(id: EntityKey<TEntity>): void {
    this.#entitiesMap.delete(id);
  }

  protected abstract generateId(): EntityKey<TEntity>;
}
