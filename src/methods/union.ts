import { BaseIterator } from '../implements';
import { IIterator } from '../intefaces';
import { DistinctClause } from '.';

export class UnionClause<T> extends BaseIterator<T> implements IIterator<T>{
    nextSource: T[];
    
    execute(source: T[]): T[] {
        let _result = source.concat(this.nextSource);
        return new DistinctClause<T>().execute(_result);
    }

    constructor(unionSource: T[]){
        super();
        this.nextSource = unionSource;
    }
}