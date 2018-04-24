import { IIterator } from "../intefaces/iterator.interface";
import { SelectClause } from "./select";
import { JoinClause } from "./join";
import { GroupByClause } from "./groupBy";
import { BaseIterator } from "../implements/base.iterator";

export class GroupJoinClause<T, S> extends BaseIterator<T> implements IIterator<T> {

    nextSource: any[] | Promise<any[]>;

    _joinIterator: (aEntity: T, bEntity: S) => boolean;

    _groupIterator: (entity: { x: T; y: S; }) => any;

    execute(source: T[]): T[] | any[] {

        if (!source) return null;

        let _result = new JoinClause(this.nextSource, this._joinIterator).execute(source);

        _result = new GroupByClause(this._groupIterator).execute(_result as { x: T; y: S; }[]);

        return _result;

    }

    constructor(
        anotherSource: S[],
        joinIterator: (aEntity: T, bEntity: S) => boolean,
        groupIterator: (entity: { x: T; y: S; }) => any) {

        super();

        this._joinIterator = joinIterator;
        this._groupIterator = groupIterator;
        this.nextSource = anotherSource;
    }

    private distinct(array: any[]) {
        return array.filter((val, index, self) => {
            return self.indexOf(val) === index;
        }).filter(x => x != undefined);
    }
}