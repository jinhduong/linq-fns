import { IIterator } from "../intefaces/iterator.interface";
import { OrderByClause } from "./orderBy";
import { BaseIterator } from "../implements/base.iterator";

export class OrderByDescendingClause<T> extends BaseIterator<T> implements IIterator<T> {

    _iterator: (item: T) => any;

    execute(source: T[]): T[] | any[] {

        if (!source) return null;

        let _result = new OrderByClause(this._iterator).execute(source);

        return _result.reverse();
    }

    constructor(func: (item: T) => any) {
        super();
        this._iterator = func;
    }
}