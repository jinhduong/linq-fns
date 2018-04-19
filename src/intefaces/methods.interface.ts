export interface Methods<T> {
    where(iterator: (entity: T) => boolean): Methods<T>;
    select<S>(iterator: (entity: T) => S): Methods<S>;
    toList<S extends T>(): Promise<S[]>;
    first(iterator?: (entity: T) => boolean): Promise<T>;
    firstOrDefault(iterator?: (entity: T) => boolean): Promise<T>;
    last(iterator?: (entity: T) => boolean): Promise<T>;
    lastOrDefault(iterator?: (entity: T) => boolean): Promise<T>;
    count(iterator?: (entity: T) => boolean): Promise<number>;
}