export interface Methods<T> {
    where(iterator: (entity: T) => boolean): Methods<T>;
    select<S>(iterator: (entity: T) => S): Methods<S>;
    toList<S extends T>(): S[];
}