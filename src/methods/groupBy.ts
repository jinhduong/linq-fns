import { IIterator } from "../intefaces/iterator.interface";
import { SelectClause } from "./select";
import { BaseIterator } from "../implements/baseIterator";
import { Utils } from '../utils/index';

export class GroupByClause<T> extends BaseIterator<T> implements IIterator<T> {

    _iterator: (item: T) => any;

    execute(source: T[]): T[] | any[] {

        if (!source) return null;

        let _mappingSource = {}; // Object contains all data in array follow by [index] : {object}
        let _indexes = [] as Array<{ value, index }>; // Make indexes table base on iterator function
        let _groupByObj = {} // Object contains [groupByValue] : <any>[]
        let _distinctGroupByValues = Utils.distinct
            (new SelectClause(this._iterator).execute(source));

        // Make mapping source by indexes
        source.forEach((x: T, i: number) => {
            _mappingSource[i] = x;
        });

        // Make lookup list base on input iterator function
        _indexes = (source as T[]).map((x: T, index: number) => {
            return {
                value: (this._iterator(x)),
                index: index
            }
        }).filter(x => x.value != undefined);

        // Preparing
        _distinctGroupByValues.forEach(key => {
            _groupByObj[key] = [];
        });

        if (!_groupByObj) return null;

        _indexes.forEach(lk => {
            (_groupByObj[lk.value] as T[]).push(_mappingSource[lk.index]);
        });

        return Object.keys(_groupByObj).map(groupByProp => {
            return {
                key: groupByProp,
                items: _groupByObj[groupByProp]
            };
        });
    }

    constructor(func: (item: T) => any) {
        super();
        this._iterator = func;
    }
}