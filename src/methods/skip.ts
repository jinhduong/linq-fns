import { IIterator } from "../intefaces/iterator.interface";

export class SkipClause<T> implements IIterator<T> {

    _iterator: number;

    execute(source: any[] | T[]): T[] | any[] {
        if (source) {
            return (source as T[]).slice(this._iterator);
        }
        return source;
    }

    constructor(skip: number) {
        this._iterator = skip;
    }
}