export interface Methods<T> {
    where(iterator: (entity: T) => boolean): Methods<T>;
    select<S>(iterator: (entity: T) => S): Methods<S>;
    toList<S extends T>(): Promise<S[]>;
    first(): Promise<T>;
    firstOrDefault(): Promise<T>;
    last(): Promise<T>;
    lastOrDefault(): Promise<T>;
    count(): Promise<number>;
}