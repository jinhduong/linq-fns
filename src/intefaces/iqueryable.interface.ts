import { IIterator } from "./iterator.interface";
import { Methods } from "./methods.interface";

export interface IQueryable<T> {
    from(source: Array<T> | Promise<T> | Array<any> | Promise<any>): Methods<T>;
}