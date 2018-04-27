import { IIterator } from "../intefaces/iterator.interface";
import { BaseIterator } from "../implements/baseIterator";
import { Utils } from '../utils/index';

export class ContainsClause<T> extends BaseIterator<T> implements IIterator<T> {

    _entity: T;

    execute(source: T[] | any[]): T[] | T | any {

        if (!source) return false;

        let _flag = false;
        for (let i = 0, li = source.length; i < li; i++) {
            if (Utils.compare(source[i], this._entity)) {
                _flag = true;
                break;
            }
        }

        return _flag;
    }

    constructor(entity: T) {
        super();
        this._entity = entity;
    }
}