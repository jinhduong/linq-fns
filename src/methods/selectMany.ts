import { IIterator } from "../intefaces/iterator.interface";
import { SelectClause } from "./select";

export class SelectManyClause<T> implements IIterator<T> {

    _iterator: (item: T, index?: number) => boolean;

    execute(source: any[] | T[]): T[] | any[] {
        if (!source) return null;

        let _result = new SelectClause(this._iterator).execute(source);

        if (!_result) return null;

        let _tmp = [];
        for (let i = 0, li = _result.length; i < li; i++) {
            if (Array.isArray(_result[i]))
                _tmp = _tmp.concat(_result[i])
            else
                _tmp.push(_result[i])
        }
        return _tmp;
    }

    constructor(func: (item: T, index?: number) => any) {
        this._iterator = func;
    }
}