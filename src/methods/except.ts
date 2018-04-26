import { BaseIterator } from '../implements';
import { IIterator } from '../intefaces';
import { Utils } from '../utils';
import { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } from 'constants';

export class ExceptClause<T> extends BaseIterator<T> implements IIterator<T>{
    nextSource: T[];

    execute(source: T[]): T[] {
        let _result: T[] = [];
        for (let i = 0, li = source.length; i < li; i++) {
            let isExistArr2 = false;
            for (let j = 0, lj = this.nextSource.length; j < lj; j++) {
                if (Utils.compare(source[i], this.nextSource[j])) {
                    isExistArr2 = true;
                    break;
                }
            }
            if (!isExistArr2) _result.push(source[i]);
        }

        if (!_result) return null;

        return _result;
    }

    constructor(another: T[]) {
        super();
        this.nextSource = another;
    }
}