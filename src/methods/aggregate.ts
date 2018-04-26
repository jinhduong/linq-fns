import { BaseIterator } from '../implements';
import { IIterator } from '../intefaces';

export class AggregateClause<T> extends BaseIterator<T> implements IIterator<T>{
    _iterator: (accumulator: T, inital: T, index?: number) => any;

    execute(source: T[]): any {
        return source.reduce((pre, cur, index) => {
            return this._iterator(pre, cur, index);
        });
    }

    constructor(iterator: (accumulator: T, inital: T, index?: number) => any) {
        super();
        this._iterator = iterator;
    }
}