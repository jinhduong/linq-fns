import { IIterator } from "../intefaces/iterator.interface";

export class TakeClause<T> implements IIterator<T> {

    _iterator: number;

    execute(source: any[] | T[]): T[] | any[] {
        if (source) {
            return (source as T[]).slice(0, this._iterator);
        }
        return source;
    }

    constructor(skip: number) {
        this._iterator = skip;
    }
}