import { IRepository } from './interfaces/repository.interface';
import { database } from './database.interface';
import { IMethods } from '../intefaces';

export class BaseRepository<T> implements IRepository<T> {

    private _methods: { name: 'ADD' | 'UPD' | 'DEL', item: T }[] = [];

    getQuery(predicate: (
        ref: database.Reference) => database.Query,
        action: "value" | "child_added" | "child_changed" | "child_moved" | "child_removed"): IMethods<T> {
        throw new Error("Method not implemented.");
    }

    add(item: T, autoCommit = false): void {
        if (autoCommit) {
            this._add(item);
            return;
        }
        this._methods.push({ name: 'ADD', item: item })
    }

    remove(item: T, autoCommit = false): void {
        if (autoCommit) {
            this._remove(item);
            return;
        }
        this._methods.push({ name: 'DEL', item: item })
    }

    update(item: T, autoCommit = false): void {
        if (autoCommit) {
            this._update(item);
            return;
        }
        this._methods.push({ name: 'UPD', item: item })
    }

    commitChanges(): void {
        for (let i = 0, li = this._methods.length; i < li; i++) {
            const _tmp = this._methods[i];
            switch (_tmp.name) {
                case 'ADD': this._add(_tmp.item);
                case 'UPD': this._update(_tmp.item);
                case 'DEL': this._remove(_tmp.item);
                default: throw new Error("Method just only add, update, delete");
            }
        }
        this._methods = [];
    }

    _add(item: T): void {
        throw new Error("Method not implemented.");
    }

    _remove(item: T): void {
        throw new Error("Method not implemented.");
    }

    _update(item: T): void {
        throw new Error("Method not implemented.");
    }
}