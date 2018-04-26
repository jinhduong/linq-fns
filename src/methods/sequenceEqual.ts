import { BaseIterator } from '../implements';
import { IIterator } from '../intefaces';
import { Utils } from '../utils';

export class SequenceEqualClause<T> extends BaseIterator<T> implements IIterator<T>{
    nextSource;

    execute(source: T[]): boolean {

        if (source.length !== this.nextSource.length) return false;

        for (let i = 0, li = source.length; i < li; i++) {
            if (!Utils.compare(source[i], this.nextSource[i]))
                return false;
        }

        return true;
    }

    constructor(another: T[]) {
        super();
        this.nextSource = another;
    }
}