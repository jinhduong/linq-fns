import { IIterator } from "../intefaces/iterator.interface";
import { SelectClause } from "./select";
import { BaseIterator } from "../implements/baseIterator";

export class OrderByClause<T> extends BaseIterator<T> implements IIterator<T> {

    _iterator: (item: T) => any;

    execute(source: T[]): T[] {

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

        if (!_result) return null;

        // Sort on loopkup list
        _result.sort((a: { value, index }, b: { value, index }) => {
            if (a.value < b.value) return -1;
            if (a.value > b.value) return 1;
            return 0;
        });

        // Re-map to original list
        return _result.map((x: { value, index }) => {
            return _tmp[x.index];
        });
    }

    constructor(func: (item: T) => any) {
        super();
        this._iterator = func;
    }
}