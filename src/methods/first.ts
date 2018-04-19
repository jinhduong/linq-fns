import { IIterator } from "../intefaces/iterator.interface";

export class FirstClause<T> implements IIterator<T> {

    _iterator: (item: T) => boolean;

    execute(source: any[] | T[]): T[] | T {
        if (!this._iterator) {
            return source[0];
        }
        else {
            return (source as T[]).filter((x) => {
                return this._iterator(x);
            })[0];
        }
    }

    constructor(func?: (item: T) => boolean) {
        this._iterator = func;
    }
}