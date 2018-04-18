import { IIterator } from "../intefaces/iterator.interface";

export class SelectClause<T> implements IIterator<T> {

    _iterator: (item: T) => boolean;

    execute(source: any[] | T[]): T[] | any[] {
        if (source) {
            return (source as T[]).map(x => (this._iterator(x)));
        }
        return source;
    }

    constructor(func: (item: T) => any) {
        this._iterator = func;
    }
}