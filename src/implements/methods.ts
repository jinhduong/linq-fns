import { Methods } from "../intefaces/methods.interface";
import { IIterator } from "../intefaces/iterator.interface";
import { WhereClause } from "../methods/where";
import { SelectClause } from "../methods/select";
import { Utils } from "../utils/object";
import { FirstClause } from "../methods/first";
import { LastClause } from "../methods/last";
import { CountClause } from "../methods/count";

export class IteratorMethods<T> implements Methods<T> {

    // Contains all iterators
    _iteratorCollection: Array<IIterator<T>> = [];

    // Contains initial source
    _source: any[] | Promise<any> | T[] | Promise<T> = [];

    _data: any[];

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

        // From cache
        if (this._data) {
            let _result = this.runIterators(this._data);
            return Promise.resolve(_result as S[]);
        }
        // From promise
        else if (Utils.isPromise(this._source)) {
            return (this._source as Promise<T[]>).then(data => {
                let _result = this.runIterators(data);
                this._data = data;
                return _result as S[];
            });
        }
        // From static data
        else if (this._source) {
            let _result = this.runIterators(this._source as T[]);
            return Promise.resolve(_result as S[]);
        }
        return null;
    }

    first(iterator?: (entity: T) => boolean): Promise<T> {
        return this.toList().then((data: T[]) => {
            return new FirstClause(iterator).execute(data) as T;
        });
    }

    firstOrDefault(iterator?: (entity: T) => boolean): Promise<T> {
        return this.toList().then((data: T[]) => {
            return (new FirstClause(iterator).execute(data) || null) as T;
        });
    }

    last(iterator?: (entity: T) => boolean): Promise<T> {
        return this.toList().then((data: T[]) => {
            return new LastClause(iterator).execute(data) as T;
        });
    }

    lastOrDefault(iterator?: (entity: T) => boolean): Promise<T> {
        return this.toList().then((data: T[]) => {
            return (new LastClause(iterator).execute(data) || null) as T;
        });
    }

    count(iterator?: (entity: T) => boolean): Promise<number> {
        return this.toList().then((data: T[]) => {
            return (new CountClause(iterator).execute(data) || null) as number;
        });
    }

    // Private funstions

    private runIterators(syncSource: T[]) {

        let _result = Object.assign([], syncSource);

        this._iteratorCollection.forEach((ite: IIterator<T>) => {
            _result = ite.execute(_result) as T[];
        });

        return _result;
    }
}