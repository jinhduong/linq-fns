import { IIterator } from "../intefaces/iterator.interface";

export class LastClause<T> implements IIterator<T> {

    _iterator: (item: T) => boolean;

    execute(source: any[] | T[]): T[] | T {
        if (!source) {
            return source[source.length];
        }
        else {
            return (source as T[]).filter((x) => {
                return this._iterator(x);
            })[source.length - 1];
        }
    }

    constructor(func?: (item: T) => boolean) {
        this._iterator = func;
    }
}