import { IIterator } from "../intefaces/iterator.interface";
import { OrderByClause } from "./orderBy";

export class OrderByDescendingClause<T> implements IIterator<T> {

    _iterator: (item: T) => any;

    execute(source: T[]): T[] | any[] {

        if (!source) return null;

        let _result = new OrderByClause(this._iterator).execute(source);

        return _result.reverse();
    }

    constructor(func: (item: T) => any) {
        this._iterator = func;
    }
}