import { IMethods } from '../../intefaces/index';
import { database } from '../database.interface';

export interface IRepository<T> {
    getQuery(
        predicate: (ref: database.Reference) => database.Query,
        action: database.EventType): IMethods<T>;
    add(item: T, autoCommit?: boolean): void;
    remove(item: T, autoCommit?: boolean): void;
    update(item: T, autoCommit?: boolean): void;
    commitChanges(): void;

    // methods implements
    _add(item: T, cb?: (rs: any) => any): void;
    _remove(item: T, cb?: (rs: any) => any): void;
    _update(item: T, cb?: (rs: any) => any): void;
}