import { IIterator } from "../intefaces/iterator.interface";
import { WhereClause } from "./where";
import { BaseIterator } from "../implements/base.iterator";

export class SingleClause<T> extends BaseIterator<T> implements IIterator<T> {

    _iterator: (item: T) => boolean;

    execute(source: any[] | T[]): T {
        if (!this._iterator) {
            return this.getSingle(source);
        }
        else {
            let _result = new WhereClause(this._iterator).execute(source);
            return this.getSingle(_result);
        }
    }

    private getSingle(src: any[] | T[]): T | any {
        if (src.length > 1) throw new Error("The collection does not contain exactly one element");
        else if (src.length === 1)
            return src[0];
    }

    constructor(func?: (item: T) => boolean) {
        super();
        this._iterator = func;
    }
}