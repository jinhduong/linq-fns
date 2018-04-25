import { IIterator } from "../intefaces/iterator.interface";
import { BaseIterator } from "../implements/baseIterator";

export class JoinClause<T, S> extends BaseIterator<T> implements IIterator<T> {

    _iterator: (item1: T, item2: S) => boolean;

    nextSource: S[] | Promise<S[]>;

    execute(source: any[] | T[]): T[] | any[] {
        if (source) {
            let _result = [];
            for (let i = 0, li = source.length; i < li; i++) {
                for (let j = 0, lj = (this.nextSource as S[]).length; j < lj; j++) {
                    const iEntity = source[i];
                    const jEntity = this.nextSource[j];
                    if (this._iterator(iEntity, jEntity)) {
                        _result.push({
                            x: iEntity,
                            y: jEntity
                        });
                    }
                }
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