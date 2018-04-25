import { BaseIterator } from '../implements';
import { IIterator } from '../intefaces';

export class ConcatClause<T> extends BaseIterator<T> implements IIterator<T>{
    nextSource;

    execute(source: T[]): T[] {
        return source.concat(this.nextSource);
    }

    constructor(another: T[] | Promise<T[]>) {
        super();
        this.nextSource = another;
    }
}