import { IIterator } from "../intefaces/iterator.interface";
import { SelectClause } from "./select";

export class MaxClause<T> implements IIterator<T> {

    _iterator: (item: T) => any;

    execute(source: any[] | T[]): T[] | T | any {
        if (!source) return 0;

        let _result = new SelectClause(this._iterator).execute(source) as number[];

        if (!_result) return 0;

        if (!Number.isNaN(_result[0])) throw new Error("Sum operator require type of number");

        return Math.max(..._result);
    }

    constructor(func?: (item: T) => any) {
        this._iterator = func;
    }
}