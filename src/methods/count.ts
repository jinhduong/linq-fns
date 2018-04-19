import { IIterator } from "../intefaces/iterator.interface";

export class CountClause<T> implements IIterator<T> {

    _iterator: (item: T) => boolean;

    execute(source: any[] | T[]): T[] | T | any {
        if (!source) return source.length;
        else {
            return (source as T[]).filter((x) => {
                return this._iterator(x);
            }).length;
        }
    }

    constructor(func?: (item: T) => boolean) {
        this._iterator = func;
    }
}