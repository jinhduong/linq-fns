import { IIterator } from "../intefaces/iterator.interface";
import { SkipClause } from "./skip";
import { BaseIterator } from "../implements/baseIterator";

export class SkipWhileClause<T> extends BaseIterator<T> implements IIterator<T> {

    _iterator: (item: T) => boolean;

    execute(source: T[]): T[]{
        if (source) {
            let _skipCount = 0;
            for (let i = 0; i < source.length; i++) {
                const _item = source[i];
                if (this._iterator(_item)) break;
                _skipCount += 1;
            }
            return new SkipClause<T>(_skipCount).execute(source);
        }
        return null;
    }

    constructor(func: (item: T) => boolean) {
        super();
        this._iterator = func;
    }
}