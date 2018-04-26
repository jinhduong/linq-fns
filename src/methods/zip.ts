import { BaseIterator } from '../implements';
import { IIterator } from '../intefaces';

export class ZipClause<T, S> extends BaseIterator<T> implements IIterator<T>{
    nextSource: S[];
    _iterator: (item1: T, item2: S) => any;

    execute(source: T[]): [T, S][] | any[] {
        const li = source.length;
        const lj = this.nextSource.length;
        const luse = li > lj ? lj : li;

        return source.map((item, index) => {
            if (index > luse - 1) return undefined;
            if (!this._iterator) {
                return [item, this.nextSource[index]];
            } else {
                return this._iterator(item, this.nextSource[index]);
            }
        }).filter(x => x !== undefined);
    }

    constructor(another: S[], iterator?: (item1: T, item2: S) => any) {
        super();
        this.nextSource = another;
        this._iterator = iterator;
    }
}