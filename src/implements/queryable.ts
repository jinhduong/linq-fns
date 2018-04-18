import { Utils } from "../utils/object";
import { IQueryable } from "../intefaces/iqueryable.interface";
import { IIterator } from "../intefaces/iterator.interface";
import { IteratorMethods } from "./methods";
import { Methods } from "../intefaces/methods.interface";

export class Queryable<T> implements IQueryable<T> {
    _iteratorCollection: Array<IIterator<T>> = [];

    from(source: any[] | Promise<any> | T[] | Promise<T>): Methods<T> {
        return new IteratorMethods(this._iteratorCollection, source);
    }
}