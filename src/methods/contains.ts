import { IIterator } from "../intefaces/iterator.interface";

export class ContainsClause<T> implements IIterator<T> {

    _entity: T;

    execute(source: T[] | any[]): T[] | T | any {

        if (!source) return false;

        let _flag = false;
        for (let i = 0, li = source.length; i < li; i++) {
            if (source[i] === this._entity) {
                _flag = true;
                break;
            }
        }

        return _flag;
    }

    constructor(entity: T) {
        this._entity = entity;
    }
}