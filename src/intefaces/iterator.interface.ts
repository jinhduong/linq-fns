export interface IIterator<T> {
    execute(source: Array<T> | Array<any>): Array<T>;
}