import { IIterator } from "../intefaces/iterator.interface";
import { BaseIterator } from "../implements/baseIterator";

export class SkipClause<T> extends BaseIterator<T> implements IIterator<T> {

    _iterator: number;

    execute(source: T[]): T[]{
        if (source) {
            return source.slice(this._iterator);
        }
        return source;
    }

    constructor(skip: number) {
        super();
        this._iterator = skip;
    }
}