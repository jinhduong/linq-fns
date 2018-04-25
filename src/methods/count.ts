import { IIterator } from "../intefaces/iterator.interface";
import { BaseIterator } from "../implements/baseIterator";

export class CountClause<T> extends BaseIterator<T> implements IIterator<T> {

    _iterator: (item: T) => boolean;

    execute(source: any[] | T[]): T[] | T | any {
        if (!source) return source.length;
        else if (!this._iterator) return source.length;
        else {
            return (source as T[]).filter((x) => {
                return this._iterator(x);
            }).length;
        }
    }

    constructor(func?: (item: T) => boolean) {
        super();
        this._iterator = func;
    }
}