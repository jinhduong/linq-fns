export interface IMethods<T> {
    // Extend methods
    clone(): IMethods<T>;

    // Query methods
    where(iterator: (entity: T) => boolean): IMethods<T>;
    select<S>(iterator: (entity: T) => S): IMethods<S>;
    selectMany<S>(iterator: (entity: T, index?: number) => S): IMethods<S | { index: number, value: S }>;
    take(value: number): IMethods<T>;
    skip(value: number): IMethods<T>;
    skipWhile(iterator: (entity: T) => boolean): IMethods<T>;
    takeWhile(iterator: (entity: T) => boolean): IMethods<T>;
    orderBy(iterator: (entity: T) => void): IMethods<T>;
    orderByDescending(iterator: (entity: T) => void): IMethods<T>;
    join<S>(source: S[] | Promise<S[]>, iterator: (aEntity: T, bEntity: S) => boolean): IMethods<{ x: T, y: S }>;
    leftJoin<S, U extends T & S>(source: S[] | Promise<S[]>, iterator: (aEntity: T, bEntity: S) => boolean): IMethods<U>;
    groupBy(iterator: (entity: T) => any): IMethods<{ key: any, items: T[] }>;
    groupJoin<S>(source: S[] | Promise<S[]>, joinIterator: (aEntity: T, bEntity: S) => boolean, groupIterator: (entity: { x: T, y: S }) => any): IMethods<{ key: any, items: T[] }>;
    distinct(comparer?: (aEntity: T, bEntity: T) => boolean): IMethods<T>
    concat(another: T[] | Promise<T[]>): IMethods<T>

    // Execute methods
    toList<S extends T>(): Promise<S[]>;

    sum<S>(iterator: (entity: T) => S): Promise<number>;
    min<S>(iterator: (entity: T) => S): Promise<number>;
    max<S>(iterator: (entity: T) => S): Promise<number>;
    avarage<S>(iterator?: (entity: T) => S): Promise<number>;
    any<T>(iterator: (entity: T) => boolean): Promise<boolean>;
    all<T>(iterator: (entity: T) => boolean): Promise<boolean>;
    contains(entity: T): Promise<boolean>;

    // Methods with optional iterator
    first(iterator?: (entity: T) => boolean): Promise<T>;
    firstOrDefault(iterator?: (entity: T) => boolean): Promise<T>;
    last(iterator?: (entity: T) => boolean): Promise<T>;
    lastOrDefault(iterator?: (entity: T) => boolean): Promise<T>;
    single(iterator?: (entity: T) => boolean): Promise<T>;
    singleOrDefault(iterator?: (entity: T) => boolean): Promise<T>;
    count(iterator?: (entity: T) => boolean): Promise<number>;
}