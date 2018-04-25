import { IIterator } from "../intefaces/iterator.interface";
import { SelectClause } from "./select";
import { BaseIterator } from "../implements/baseIterator";

export class AvarageClause<T> extends BaseIterator<T> implements IIterator<T> {

    _iterator: (item: T) => any;

    execute(source: any[] | T[]): T[] | T | any {
        if (!source) return 0;

        let _result = new SelectClause(this._iterator).execute(source) as number[];

        if (!_result) return 0;

        if (!Number.isNaN(_result[0])) throw new Error("Avarage operator need type of number");

        return (_result.reduce((a, b) => a + b, 0)) / _result.length;
    }

    constructor(func?: (item: T) => any) {
        super();
        this._iterator = func;
    }
}