import { Methods } from "../intefaces/methods.interface";
import { IIterator } from "../intefaces/iterator.interface";
import { WhereClause } from "../methods/where";
import { SelectClause } from "../methods/select";

export class IteratorMethods<T> implements Methods<T> {

    // Contains all iterators
    _iteratorCollection: Array<IIterator<T>> = [];

    // Contains initial source
    _source: any[] | Promise<any> | T[] | Promise<T> = [];

    constructor(iteratorCollection: Array<IIterator<T>>, source: any[] | Promise<any> | T[] | Promise<T>) {
        this._iteratorCollection = iteratorCollection;
        this._source = source;
    }

    where(iterator: (entity: T) => boolean): Methods<T> {
        this._iteratorCollection.push(new WhereClause(iterator));
        return this;
    }

    select<S>(iterator: (entity: T) => S): Methods<S> {
        this._iteratorCollection.push(new SelectClause(iterator))
        return this as any;
    }

    toList<S>(): S[] {
        if (this._source) {
            let _result = Object.assign([], this._source as any[] | T[]);
            this._iteratorCollection.forEach((ite: IIterator<T>) => {
                _result = ite.execute(_result);
            });
            return _result as S[];
        }
        return null;
    }
}