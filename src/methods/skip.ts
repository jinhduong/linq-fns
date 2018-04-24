import { IIterator } from "../intefaces/iterator.interface";
import { BaseIterator } from "../implements/base.iterator";

export class SkipClause<T> extends BaseIterator<T> implements IIterator<T> {

    _iterator: number;

    execute(source: any[] | T[]): T[] | any[] {
        if (source) {
            return (source as T[]).slice(this._iterator);
        }
        return source;
    }

    constructor(skip: number) {
        super();
        this._iterator = skip;
    }
}