import { CrudRepositoryInterface } from '../types';

export abstract class InMemoryRepository<Entity extends object, Id> implements CrudRepositoryInterface<Entity, Id> {

  private readonly storage = new Map<Id, Entity>();

  public abstract create(item: Partial<Entity>): Promise<Entity>;

  public abstract delete(id: Id): Promise<void>;

  public abstract findById(id: Id): Promise<Entity | null>;

  public abstract update(id: Id, item: Partial<Entity>): Promise<Entity | null>;

  protected getItem(key: Id): Entity | null {
    return this.storage.get(key) || null;
  }

  protected setItem(key: Id, value: Entity): void {
    this.storage.set(key, value);
  }

  protected removeItem(key: Id): void {
    this.storage.delete(key);
  }

  protected getStorageValues(): Array<Entity> {
    return Array.from(this.storage.values());
  }

}
