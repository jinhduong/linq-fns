import { IIterator } from "../intefaces/iterator.interface";
import { BaseIterator } from "../implements/baseIterator";

export class FirstClause<T> extends BaseIterator<T> implements IIterator<T> {

    _iterator: (item: T) => boolean;

    execute(source: T[]): T {
        if (!this._iterator)
            return source[0];
        else {
            return (source as T[]).filter((x) => {
                return this._iterator(x);
            })[0];
        }
    }

    constructor(func?: (item: T) => boolean) {
        super();
        this._iterator = func;
    }
}