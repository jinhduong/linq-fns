import { IIterator } from "../intefaces/iterator.interface";
import { BaseIterator } from "../implements/baseIterator";

export class LeftJoinClause<T, S> extends BaseIterator<T> implements IIterator<T> {

    _iterator: (item1: T, item2: S) => boolean;

    nextSource: any[] | Promise<any[]>;

    execute(source: any[] | T[]): T[] | any[] {
        if (source) {
            let _result = [];
            for (let i = 0, li = source.length; i < li; i++) {
                let _flag = false;
                for (let j = 0, lj = (this.nextSource as S[]).length; j < lj; j++) {
                    if (this._iterator(source[i], this.nextSource[j])) {
                        _result.push(Object.assign({}
                            , source[i]
                            , this.nextSource[j]))
                        _flag = true; break;
                    }
                }
                if (!_flag) _result.push(Object.assign({}
                    , source[i], null
                ))
            }
            return _result;
        }
        return source;
    }

    constructor(anotherSource: S[] | Promise<S[]>, func: (item1: T, item2: S) => boolean) {
        super();
        this._iterator = func;
        this.nextSource = anotherSource;
    }
}