import { IIterator } from "../intefaces/iterator.interface";
import { BaseIterator } from "../implements/baseIterator";

export class AnyClause<T> extends BaseIterator<T> implements IIterator<T> {

    _iterator: (item: T) => boolean;

    execute(source: T[]): boolean {
        if (!source) return false;
        else {
            return (source as T[]).some((x) => {
                return this._iterator(x);
            });
        }
    }

    constructor(func: (item: T) => boolean) {
        super();
        this._iterator = func;
    }
}