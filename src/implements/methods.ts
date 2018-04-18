import { Methods } from "../intefaces/methods.interface";
import { IIterator } from "../intefaces/iterator.interface";
import { WhereClause } from "../methods/where";
import { SelectClause } from "../methods/select";
import { Utils } from "../utils/object";

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

    toList<S>(): Promise<S[]> {
        if (Utils.isPromise(this._source)) {
            return (this._source as Promise<T[]>).then(data => {
                let _result = Object.assign([], data as any[] | T[]);
                this._iteratorCollection.forEach((ite: IIterator<T>) => {
                    _result = ite.execute(_result);
                });
                return _result as S[];
            });
        }
        if (this._source) {
            let _result = Object.assign([], this._source as any[] | T[]);
            this._iteratorCollection.forEach((ite: IIterator<T>) => {
                _result = ite.execute(_result);
            });
            return Promise.resolve(_result as S[]);
        }
        return null;
    }

    first(): Promise<T> {
        return this.toList().then((data: T[]) => {
            return data[0];
        });
    }

    firstOrDefault(): Promise<T> {
        return this.toList().then((data: T[]) => {
            return data[0] || null;
        });
    }

    last(): Promise<T> {
        return this.toList().then((data: T[]) => {
            return data[data.length - 1];
        });
    }

    lastOrDefault(): Promise<T> {
        return this.toList().then((data: T[]) => {
            return data[data.length - 1] || null;
        });
    }

    count(): Promise<number> {
        return this.toList().then((data: T[]) => {
            if (!data) return 0;
            return data.length;
        });
    }
}