import { IIterator } from "../intefaces/iterator.interface";
import { BaseIterator } from "../implements/base.iterator";

export class WhereClause<T> extends BaseIterator<T> implements IIterator<T> {

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
        super();
        this._iterator = func;
    }
}