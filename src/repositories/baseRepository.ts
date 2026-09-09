export interface IRepository<T> {
  getAll(): T[];
  getById(id: number): T | null;
  create(entity: T): T;
  update(id: number, entity: Partial<T>): T | null;
  delete(id: number): boolean;
  query(predicate: (entity: T) => boolean): T[];
}

export abstract class BaseRepository<T extends { id: number }> implements IRepository<T> {
  protected storageKey: string;

  constructor(storageKey: string) {
    this.storageKey = storageKey;
  }

  getAll(): T[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  getById(id: number): T | null {
    const entities = this.getAll();
    return entities.find((e) => e.id === id) || null;
  }

  create(entity: T): T {
    const entities = this.getAll();
    const newEntity = { ...entity, id: this.generateId(entities) };
    entities.push(newEntity);
    this.save(entities);
    return newEntity;
  }

  update(id: number, updates: Partial<T>): T | null {
    const entities = this.getAll();
    const index = entities.findIndex((e) => e.id === id);
    if (index === -1) return null;

    entities[index] = { ...entities[index], ...updates };
    this.save(entities);
    return entities[index];
  }

  delete(id: number): boolean {
    const entities = this.getAll();
    const filtered = entities.filter((e) => e.id !== id);
    if (filtered.length === entities.length) return false;

    this.save(filtered);
    return true;
  }

  query(predicate: (entity: T) => boolean): T[] {
    return this.getAll().filter(predicate);
  }

  protected save(entities: T[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(entities));
  }

  protected generateId(entities: T[]): number {
    return entities.length > 0 ? Math.max(...entities.map((e) => e.id)) + 1 : 1;
  }
}
