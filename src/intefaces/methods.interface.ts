export interface Methods<T> {
    // Query methods
    where(iterator: (entity: T) => boolean): Methods<T>;
    select<S>(iterator: (entity: T) => S): Methods<S>;
    selectMany<S>(iterator: (entity: T, index?: number) => S): Methods<S | { index: number, value: S }>;
    take(value: number): Methods<T>;
    skip(value: number): Methods<T>;
    skipWhile(iterator: (entity: T) => boolean): Methods<T>;
    takeWhile(iterator: (entity: T) => boolean): Methods<T>;
    orderBy(iterator: (entity: T) => T): Methods<T>;
    orderByDescending(iterator: (entity: T) => T): Methods<T>;
    join<S>(source: S[] | Promise<S[]>, iterator: (aEntity: T, bEntity: S) => boolean): Methods<{ x: T, y: S }>;
    leftJoin<S, U extends T & S>(source: S[] | Promise<S[]>, iterator: (aEntity: T, bEntity: S) => boolean): Methods<U>;

    // Execute methods
    toList<S extends T>(): Promise<S[]>;
    first(iterator?: (entity: T) => boolean): Promise<T>;
    firstOrDefault(iterator?: (entity: T) => boolean): Promise<T>;
    last(iterator?: (entity: T) => boolean): Promise<T>;
    lastOrDefault(iterator?: (entity: T) => boolean): Promise<T>;
    single(iterator?: (entity: T) => boolean): Promise<T>;
    singleOrDefault(iterator?: (entity: T) => boolean): Promise<T>;
    count(iterator?: (entity: T) => boolean): Promise<number>;
    sum<S>(iterator: (entity: T) => S): Promise<number>;
    min<S>(iterator: (entity: T) => S): Promise<number>;
    max<S>(iterator: (entity: T) => S): Promise<number>;
    avarage<S>(iterator: (entity: T) => S): Promise<number>;
    any<T>(iterator: (entity: T) => boolean): Promise<boolean>;
}