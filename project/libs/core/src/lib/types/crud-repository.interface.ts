export interface CrudRepositoryInterface<Entity extends object, Id> {
  findById(id: Id): Promise<Entity | null>;
  create(item: Partial<Entity>): Promise<Entity>;
  update(id: Id, item: Partial<Entity>): Promise<Entity | null>;
  delete(id: Id): Promise<void>;
}
