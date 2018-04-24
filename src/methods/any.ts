import { IIterator } from "../intefaces/iterator.interface";
import { BaseIterator } from "../implements/base.iterator";

export class AnyClause<T> extends BaseIterator<T> implements IIterator<T> {

    _iterator: (item: T) => boolean;

    execute(source: T[] | any[]): T[] | T | any {
        if (!source) return false;
        else {
            return (source as T[]).every((x) => {
                return this._iterator(x);
            });
        }
    }

    constructor(func: (item: T) => boolean) {
        super();
        this._iterator = func;
    }
}