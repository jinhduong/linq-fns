import { Methods } from "../intefaces/methods.interface";
import { IIterator } from "../intefaces/iterator.interface";
import { WhereClause } from "../methods/where";
import { SelectClause } from "../methods/select";
import { Utils } from "../utils/object";
import { FirstClause } from "../methods/first";
import { LastClause } from "../methods/last";
import { CountClause } from "../methods/count";
import { TakeClause } from "../methods/take";
import { SkipClause } from "../methods/skip";
import { SkipWhileClause } from "../methods/skipWhile";
import { TakeWhileClause } from "../methods/takeWhile";
import { JoinClause } from "../methods/join";
import { LeftJoinClause } from "../methods/leftJoin";
import { SelectManyClause } from "../methods/selectMany";
import { SumClause } from "../methods/sum";
import { MinClause } from "../methods/min";
import { MaxClause } from "../methods/max";
import { SingleClause } from "../methods/single";
import { AnyClause } from "../methods/any";
import { AvarageClause } from "../methods/average";
import { OrderByClause } from "../methods/orderBy";
import { OrderByDescendingClause } from "../methods/orderByDescending";
import { GroupByClause } from "../methods/groupBy";
import { ContainsClause } from "../methods/contains";
import { GroupJoinClause } from "../methods/groupJoin";

export class IteratorMethods<T> implements Methods<T> {

    groupJoin<S>(source: S[],
        joinIterator: (aEntity: T, bEntity: S) => boolean,
        groupIterator: (entity: { x: T; y: S; }) => any): Methods<{ key: any; items: T[]; }> {
        this._iteratorCollection.push(new GroupJoinClause(source, joinIterator, groupIterator));
        return this as any;
    }
    // Contains all iterators
    _iteratorCollection: Array<IIterator<T>> = [];

    // Contains initial source
    _source: T[] | Promise<T[]>;

    _data: any[];

    constructor(iteratorCollection: Array<IIterator<T>>, source: T[] | Promise<T[]>) {
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

    selectMany<S>(iterator: (entity: T) => S): Methods<S> {
        this._iteratorCollection.push(new SelectManyClause(iterator))
        return this as any;
    }

    join<S, U>(source: S[] | Promise<S[]>, iterator: (aEntity: T, bEntity: S) => boolean): Methods<U> {
        this._iteratorCollection.push(new JoinClause(source, iterator));
        return this as any;
    }

    leftJoin<S, U>(source: S[] | Promise<S[]>, iterator: (aEntity: T, bEntity: S) => boolean): Methods<U> {
        this._iteratorCollection.push(new LeftJoinClause(source, iterator));
        return this as any;
    }

    orderBy(iterator: (entity: T) => T): Methods<T> {
        this._iteratorCollection.push(new OrderByClause(iterator));
        return this;
    }

    orderByDescending(iterator: (entity: T) => T): Methods<T> {
        this._iteratorCollection.push(new OrderByDescendingClause(iterator));
        return this;
    }

    groupBy(iterator: (entity: T) => any): Methods<{ key: any; items: T[]; }> {
        this._iteratorCollection.push(new GroupByClause(iterator));
        return this as any;
    }

    toList<S>(): Promise<S[]> {
        return this.runIterators() as any;
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

    sum<S>(iterator: (entity: T) => S): Promise<number> {
        return this.toList().then((data: T[]) => {
            return (new SumClause(iterator).execute(data) || null) as number;
        });
    }

    avarage<S>(iterator: (entity: T) => S): Promise<number> {
        return this.toList().then((data: T[]) => {
            return (new AvarageClause(iterator).execute(data) || 0) as number;
        });
    }

    min<S>(iterator: (entity: T) => S): Promise<number> {
        return this.toList().then((data: T[]) => {
            return (new MinClause(iterator).execute(data) || null) as number;
        });
    }

    max<S>(iterator: (entity: T) => S): Promise<number> {
        return this.toList().then((data: T[]) => {
            return (new MaxClause(iterator).execute(data) || null) as number;
        });
    }

    single(iterator?: (entity: T) => boolean): Promise<T> {
        return this.toList().then((data: T[]) => {
            if (!data) throw new Error("Single require source is not null");
            return new SingleClause(iterator).execute(data);

        });
    }

    singleOrDefault(iterator?: (entity: T) => boolean): Promise<T> {
        return this.toList().then((data: T[]) => {
            return new SingleClause(iterator).execute(data) || null;
        });
    }

    take(value: number): Methods<T> {
        this._iteratorCollection.push(new TakeClause(value));
        return this;
    }

    skip(value: number): Methods<T> {
        this._iteratorCollection.push(new SkipClause(value));
        return this;
    }

    skipWhile(iterator: (entity: T) => boolean): Methods<T> {
        this._iteratorCollection.push(new SkipWhileClause(iterator));
        return this;
    }

    takeWhile(iterator: (entity: T) => boolean): Methods<T> {
        this._iteratorCollection.push(new TakeWhileClause(iterator));
        return this;
    }

    any<T>(iterator: (entity: T) => boolean): Promise<boolean> {
        return this.toList().then((data: T[]) => {
            return new AnyClause(iterator).execute(data);
        });
    }

    contains(entity: T): Promise<boolean> {
        return this.toList().then((data: T[]) => {
            return new ContainsClause(entity).execute(data);
        });
    }

    // Private functions

    private runIterators(): Promise<T[]> {

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

                // Set from method's source
                _result = responseDatas[0];

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