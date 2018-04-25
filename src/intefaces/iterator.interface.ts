export interface IIterator<T> {

    // Contains the source if this iterator need itself 
    nextSource?: any[] | Promise<any[]>;

    replaceBySyncSource?(syncSource: T[]);

    hasSource(): boolean;

    // Call this clause
    execute(source: T[]): any;
}