import { IIterator } from "../intefaces/iterator.interface";
import { BaseIterator } from "../implements/baseIterator";

export class LastClause<T> extends BaseIterator<T> implements IIterator<T> {

    _iterator: (item: T) => boolean;

    execute(source: any[] | T[]): T[] | T {
        if (!source) {
            return source[source.length];
        }
        else {
            if (!this._iterator) return source[source.length - 1];
            return (source as T[]).filter((x) => {
                return this._iterator(x);
            })[source.length - 1];
        }
    }

    constructor(func?: (item: T) => boolean) {
        super();
        this._iterator = func;
    }
}