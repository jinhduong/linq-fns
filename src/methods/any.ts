import { IIterator } from "../intefaces/iterator.interface";

export class AnyClause<T> implements IIterator<T> {

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
        this._iterator = func;
    }
}