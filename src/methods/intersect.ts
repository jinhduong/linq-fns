import { BaseIterator } from '../implements/index';
import { IIterator } from '../intefaces';
import { Utils } from '../utils/index';
import { DistinctClause } from '.';

export class IntersectClasue<T> extends BaseIterator<T> implements IIterator<T>{
    nextSource: T[];

    execute(source: T[]): T[] {
        let _result: T[] = [];
        for (let i = 0, li = source.length; i < li; i++) {
            for (let j = 0, lj = this.nextSource.length; j < lj; j++) {
                if (Utils.compare(source[i], this.nextSource[j])) {
                    _result.push(source[i]);
                }
            }
        }

        if (!_result) return null;

        return new DistinctClause<T>().execute(_result);
    }

    constructor(anotherSource: T[]) {
        super();
        this.nextSource = anotherSource;
    }
}