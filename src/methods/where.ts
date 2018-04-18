import { IIterator } from "../intefaces/iterator.interface";

export class WhereClause<T> implements IIterator<T> {

    _iterator: (item: T) => boolean;

    execute(source: any[] | T[]): T[] | any[] {
        if (source) {
            return (source as T[]).filter((x) => {
                return this._iterator(x);
            });
        }
        return source;
    }

    constructor(func: (item: T) => boolean) {
        this._iterator = func;
    }
}