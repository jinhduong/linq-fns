import { IIterator } from "../intefaces/iterator.interface";
import { BaseIterator } from "../implements/baseIterator";

export class CountClause<T> extends BaseIterator<T> implements IIterator<T> {

    _iterator: (item: T) => boolean;

    execute(source: T[]): number {
        if (!source) return 0;
        else if (!this._iterator) return source.length;
        else {
            return (source as T[]).filter((x) => {
                return this._iterator(x);
            }).length || 0;
        }
    }

    constructor(func?: (item: T) => boolean) {
        super();
        this._iterator = func;
    }
}