import { IMethods, IIterator } from "../intefaces";
import { Utils } from '../utils/object';
import {
    WhereClause, SelectClause, SelectManyClause, JoinClause, LeftJoinClause, OrderByClause,
    OrderByDescendingClause, GroupByClause, GroupJoinClause, FirstClause, LastClause, CountClause,
    SumClause, AvarageClause, MinClause, MaxClause, SingleClause, TakeClause, SkipWhileClause,
    SkipClause, TakeWhileClause, AnyClause, ContainsClause
} from "../methods";
import { Queryable } from './queryable';

export class IteratorMethods<T> implements IMethods<T> {

    // Contains all iterators
    _iteratorCollection: Array<IIterator<T>> = [];

    // Contains initial source
    _source: T[] | Promise<T[]>;

    _data: any[];

    constructor(iteratorCollection: Array<IIterator<T>>, source: T[] | Promise<T[]>) {
        this._iteratorCollection = iteratorCollection;
        this._source = source;
    }

    clone(): IMethods<T> {
        const _cloneCollection = Object.assign([], this._iteratorCollection);
        return new IteratorMethods(_cloneCollection,this._source);
    }

    where(iterator: (entity: T) => boolean): IMethods<T> {
        this._iteratorCollection.push(new WhereClause(iterator));
        return this;
    }

    select<S>(iterator: (entity: T) => S): IMethods<S> {
        this._iteratorCollection.push(new SelectClause(iterator))
        return this as any;
    }

    selectMany<S>(iterator: (entity: T) => S): IMethods<S> {
        this._iteratorCollection.push(new SelectManyClause(iterator))
        return this as any;
    }

    join<S, U>(source: S[] | Promise<S[]>, iterator: (aEntity: T, bEntity: S) => boolean): IMethods<U> {
        this._iteratorCollection.push(new JoinClause(source, iterator));
        return this as any;
    }

    leftJoin<S, U>(source: S[] | Promise<S[]>, iterator: (aEntity: T, bEntity: S) => boolean): IMethods<U> {
        this._iteratorCollection.push(new LeftJoinClause(source, iterator));
        return this as any;
    }

    orderBy(iterator: (entity: T) => void): IMethods<T> {
        this._iteratorCollection.push(new OrderByClause(iterator));
        return this as any;
    }

    orderByDescending(iterator: (entity: T) => void): IMethods<T> {
        this._iteratorCollection.push(new OrderByDescendingClause(iterator));
        return this as any;
    }

    groupBy(iterator: (entity: T) => any): IMethods<{ key: any; items: T[]; }> {
        this._iteratorCollection.push(new GroupByClause(iterator));
        return this as any;
    }

    groupJoin<S>(source: S[],
        joinIterator: (aEntity: T, bEntity: S) => boolean,
        groupIterator: (entity: { x: T; y: S; }) => any): IMethods<{ key: any; items: T[]; }> {
        this._iteratorCollection.push(new GroupJoinClause(source, joinIterator, groupIterator));
        return this as any;
    }

    // Return S[] | Promise<S[]>
    toList<S>(): any {
        return this.runIterators();
    }

    first(iterator?: (entity: T) => boolean): Promise<T> {
        return this.filterReturn(this.toList(), (data) => {
            return new FirstClause(iterator).execute(data) as T;
        });
    }

    firstOrDefault(iterator?: (entity: T) => boolean): Promise<T> {
        return this.filterReturn(this.toList(), (data) => {
            return (new FirstClause(iterator).execute(data) || null) as T;
        });
    }

    last(iterator?: (entity: T) => boolean): Promise<T> {
        return this.filterReturn(this.toList(), (data) => {
            return new LastClause(iterator).execute(data) as T;
        });
    }

    lastOrDefault(iterator?: (entity: T) => boolean): Promise<T> {
        return this.filterReturn(this.toList(), (data) => {
            return (new LastClause(iterator).execute(data) || null) as T;
        });
    }

    count(iterator?: (entity: T) => boolean): Promise<number> {
        return this.filterReturn(this.toList(), (data) => {
            return (new CountClause(iterator).execute(data) || null) as number;
        }) as any;
    }


    sum<S>(iterator: (entity: T) => S): Promise<number> {
        return this.filterReturn(this.toList(), (data) => {
            return (new SumClause(iterator).execute(data) || null) as number;
        });
    }

    avarage<S>(iterator: (entity: T) => S): Promise<number> {
        return this.filterReturn(this.toList(), (data) => {
            return (new AvarageClause(iterator).execute(data) || 0) as number;
        });
    }

    min<S>(iterator: (entity: T) => S): Promise<number> {
        return this.filterReturn(this.toList(), (data) => {
            return (new MinClause(iterator).execute(data) || null) as number;
        });
    }

    max<S>(iterator: (entity: T) => S): Promise<number> {
        return this.filterReturn(this.toList(), (data) => {
            return (new MaxClause(iterator).execute(data) || null) as number;
        });
    }

    single(iterator?: (entity: T) => boolean): Promise<T> {
        return this.filterReturn(this.toList(), (data) => {
            if (!data) throw new Error("Single require source is not null");
            return new SingleClause(iterator).execute(data);

        });
    }

    singleOrDefault(iterator?: (entity: T) => boolean): Promise<T> {
        return this.filterReturn(this.toList(), (data) => {
            return new SingleClause(iterator).execute(data) || null;
        });
    }

    take(value: number): IMethods<T> {
        this._iteratorCollection.push(new TakeClause(value));
        return this;
    }

    skip(value: number): IMethods<T> {
        this._iteratorCollection.push(new SkipClause(value));
        return this;
    }

    skipWhile(iterator: (entity: T) => boolean): IMethods<T> {
        this._iteratorCollection.push(new SkipWhileClause(iterator));
        return this;
    }

    takeWhile(iterator: (entity: T) => boolean): IMethods<T> {
        this._iteratorCollection.push(new TakeWhileClause(iterator));
        return this;
    }

    any<T>(iterator: (entity: T) => boolean): Promise<boolean> {
        return this.filterReturn(this.toList(), (data) => {
            return new AnyClause(iterator).execute(data);
        });
    }

    contains(entity: T): Promise<boolean> {
        return this.filterReturn(this.toList(), (data) => {
            return new ContainsClause(entity).execute(data);
        });
    }

    // Private functions

    // This function detect the input parameter is Promise or plain array data
    // if is promise => call promise and return from callback
    // opposite => return from callback
    private filterReturn(obj: T[] | Promise<T[]>, promiseCallback: Function) {
        if (Utils.isPromise(obj)) {
            return (obj as Promise<T[]>).then((data: T[]) => {
                return promiseCallback(data);
            })
        } else
            return promiseCallback(obj);
    }

    runIterators(): Promise<T[]> | T[] {

        let _result: T[] = [];
        let _nextSources = {};
        let _promises = [];

        for (let i = 0, li = this._iteratorCollection.length; i < li; i++) {

            let _iterator = this._iteratorCollection[i];

            if (!_iterator.hasSource()) continue;

            if (Utils.isPromise(_iterator.nextSource))
                _promises.push(_iterator.nextSource);
            else
                _promises.push(Promise.resolve(_iterator.nextSource));
        }

        if (Utils.isPromise(this._source))
            _promises.unshift(this._source);
        else
            _promises.unshift(Promise.resolve(this._source));

        return new Promise(resolve => {
            Promise.all(_promises).then((responseDatas: any[]) => {

                let _index = 0;
                _result = responseDatas[0]; // Set from method's source

                for (let i = 0, li = this._iteratorCollection.length; i < li; i++) {

                    let _iterator = this._iteratorCollection[i];

                    if (_iterator.hasSource()) {
                        _iterator.replaceBySyncSource(responseDatas[_index + 1]);
                        _index += 1;
                    }
                }

                this._iteratorCollection.forEach((ite: IIterator<T>) => {
                    _result = ite.execute(_result) as T[];
                });

                resolve(_result);
            });
        });
    }
}