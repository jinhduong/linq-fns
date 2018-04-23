import { IIterator } from "../intefaces/iterator.interface";
import { SelectClause } from "./select";

export class GroupByClause<T> implements IIterator<T> {

    _iterator: (item: T) => any;

    execute(source: T[]): T[] | any[] {

        if (!source) return null;

        // Object contains all data in array follow by [index] : {object}
        let _tmp = {};

        source.forEach((x: T, i: number) => {
            _tmp[i] = x;
        });

        // Make lookup list base on input iterator function
        let _result = (source as T[]).map((x: T, index: number) => {
            return {
                value: (this._iterator(x)),
                index: index
            }
        });

        let _distinctGroupByValues =
            this.distinct(new SelectClause(this._iterator).execute(source));

        // Prepare
        let _keyLookup = {};
        _distinctGroupByValues.forEach(key => {
            _keyLookup[key] = [];
        });

        if (!_result) return null;

        _result.forEach(lk => {
            _keyLookup[lk.value] = _tmp[lk.index];
        });
    }

    constructor(func: (item: T) => any) {
        this._iterator = func;
    }

    private distinct(array: any[]) {
        return array.filter((val, index, self) => {
            return self.indexOf(val) === index;
        });
    }
}