import { IIterator } from "../intefaces/iterator.interface";
import { SelectClause } from "./select";
import { BaseIterator } from "../implements/baseIterator";

export class MaxClause<T> extends BaseIterator<T> implements IIterator<T> {

    _iterator: (item: T) => any;

    execute(source: T[]): number {
        if (!source) return 0;

        let _result;

        if (this._iterator)
            _result = new SelectClause(this._iterator).execute(source) as number[];

        if (!_result) return 0;

        if (!Number.isNaN(_result[0])) throw new Error("Max operator require type of number");

        return Math.max(..._result);
    }

    constructor(func?: (item: T) => any) {
        super();
        this._iterator = func;
    }
}