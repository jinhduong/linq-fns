import { IIterator } from "../intefaces/iterator.interface";
import { IteratorMethods } from "./methods";
import { Methods } from "../intefaces/methods.interface";

export class Queryable {

    private static _iteratorCollection: Array<IIterator<any>> = [];

    static from<T>(source: T[] | Promise<T[]>): Methods<T> {
        return new IteratorMethods(this._iteratorCollection, source);
    }
}