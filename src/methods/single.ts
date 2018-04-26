import { IIterator } from "../intefaces/iterator.interface";
import { WhereClause } from "./where";
import { BaseIterator } from "../implements/baseIterator";
import { Utils } from '../utils';

export class SingleClause<T> extends BaseIterator<T> implements IIterator<T> {

    _iterator: (item: T) => boolean;

    execute(source: T[]): T {

        let _result = source;

        if (this._iterator)
            _result = new WhereClause(this._iterator).execute(_result);

        return Utils.getSingle(_result);
    }

    constructor(func?: (item: T) => boolean) {
        super();
        this._iterator = func;
    }
}