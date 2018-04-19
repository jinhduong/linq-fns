export interface Methods<T> {
    // Query methods
    where(iterator: (entity: T) => boolean): Methods<T>;
    select<S>(iterator: (entity: T) => S): Methods<S>;
    take(value: number): Methods<T>;
    skip(value: number): Methods<T>;
    skipWhile(iterator: (entity: T) => boolean): Methods<T>;
    takeWhile(iterator: (entity: T) => boolean): Methods<T>;
    join<S>(source: S[] | Promise<S[]>, iterator: (aEntity: T, bEntity: S) => boolean): Methods<{ x: T, y: S }>;

    // Execute methods
    toList<S extends T>(): Promise<S[]>;
    first(iterator?: (entity: T) => boolean): Promise<T>;
    firstOrDefault(iterator?: (entity: T) => boolean): Promise<T>;
    last(iterator?: (entity: T) => boolean): Promise<T>;
    lastOrDefault(iterator?: (entity: T) => boolean): Promise<T>;
    count(iterator?: (entity: T) => boolean): Promise<number>;
}