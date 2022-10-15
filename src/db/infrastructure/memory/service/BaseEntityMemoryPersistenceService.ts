export type MapKey = number | string;

export interface BaseEntity<TKey extends MapKey = MapKey> {
  id: TKey;
}

export type InsertQuery<TEntity extends BaseEntity = BaseEntity> =
  | TEntity
  | Omit<TEntity, 'id'>;

export type UpdateQuery<TEntity extends BaseEntity = BaseEntity> =
  Partial<TEntity>;

export abstract class BaseEntityMemoryPersistenceService<
  TEntity extends BaseEntity<TKey>,
  TKey extends MapKey,
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

  public find(id: TKey): TEntity | undefined {
    return this.#findById(id);
  }

  public update(id: TKey, query: UpdateQuery<TEntity>): void {
    const entityToUpdate: TEntity | undefined = this.#findById(id);

    if (entityToUpdate !== undefined) {
      const updatedEntity: TEntity = {
        ...entityToUpdate,
        ...query,
      };

      this.#persistEntity(updatedEntity);
    }
  }

  #findById(id: TKey): TEntity | undefined {
    return this.#entitiesMap.get(id);
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
