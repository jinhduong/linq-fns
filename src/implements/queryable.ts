import { IMethods, IIterator } from '../intefaces';
import { SyncIteratorMethods, IteratorMethods } from './index';

export class Queryable {

    private static _iteratorCollection: Array<IIterator<any>> = [];

    static from<T>(source: T[] | Promise<T[]>): IMethods<T> {
        return new IteratorMethods([], source);
    }

    static fromSync<T>(source: T[]): IMethods<T> {
        return new SyncIteratorMethods([], source);
    }
}