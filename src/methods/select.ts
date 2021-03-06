import { IIterator } from "../intefaces/iterator.interface";
import { BaseIterator } from "../implements/baseIterator";

export class SelectClause<T> extends BaseIterator<T> implements IIterator<T> {

    _iterator: (item: T) => boolean;

    execute(source: T[]): any[]{
        if (source) {
            return (source as T[]).map(x => (this._iterator(x)));
        }
        return source;
    }

    constructor(func: (item: T) => any) {
        super();
        this._iterator = func;
    }
}