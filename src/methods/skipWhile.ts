import { IIterator } from "../intefaces/iterator.interface";
import { SkipClause } from "./skip";

export class SkipWhileClause<T> implements IIterator<T> {

    _iterator: (item: T) => boolean;

    execute(source: any[] | T[]): T[] | any[] {
        if (source) {
            let _skipCount = 0;
            for (let i = 0; i < (source as T[]).length; i++) {
                const _item = source[i];
                if (this._iterator(_item)) break;
                _skipCount += 1;
            }
            return new SkipClause(_skipCount).execute(source);
        }
        return null;
    }

    constructor(func: (item: T) => boolean) {
        this._iterator = func;
    }
}