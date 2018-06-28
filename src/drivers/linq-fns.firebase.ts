import { database } from './database.interface';
import { Queryable } from '..';
import { IMethods } from '../intefaces';
import { IRepository } from './interfaces/repository.interface';
import { BaseRepository } from './base.repository';

export class FireBaseQueryable<T> extends BaseRepository<T> implements IRepository<T> {

    private _repoName = '';
    private _ref: database.Reference;
    private _db: database.Database;

    constructor(db: database.Database, repoName: string) {
        super();
        this._db = db;
        this._repoName = repoName;
        this._ref = this.getRefObject(this._repoName);
    }

    getQuery(
        predicate?: (ref: database.Reference) => database.Query,
        action: database.EventType = "value"): IMethods<T> {

        return Queryable.from(
            new Promise<T[]>((resolve, reject) => {
                if (!predicate)
                    this._ref.on(action, (snapshot) => {
                        resolve(this.convert(snapshot.val()));
                    });
                else {
                    const query = predicate(this._ref);
                    query.on(action, (snapshot) => {
                        resolve(this.convert(snapshot.val()));
                    });
                }
            }));
    }

    _add(item: T, callback?: (rs: any) => any) {
        this._ref.push(item, (rs) => {
            if (callback) callback(rs);
        });
    }

    _update<S extends T & { __id: string }>(item: S, callback?: (rs: any) => any) {
        const key = item.__id;
        const objUpdate = {};

        delete item.__id;
        objUpdate[key] = item;

        this._ref.update(objUpdate, (rs) => {
            if (callback) callback(rs);
        });
    }

    _remove<S extends T & { __id: string }>(item: S, callback?: (rs: any) => any) {
        this._ref.child(item.__id).remove((rs) => {
            if (callback) callback(rs);
        });
    }

    // Private methods

    private convert<T>(objData: Object): T[] {
        if (!objData) return [];
        return Object.keys(objData).map(prop => {
            objData[prop]['__id'] = prop;
            return objData[prop];
        });
    }

    private getRefObject(name: string): database.Reference {
        if (!name) throw new Error(`name cannot empty`);

        const arr = name.split('.');
        let _refs: database.Reference[] = [];

        try {

            for (let i = 0, li = arr.length; i < li; i++) {
                i === 0 ? _refs.push(this._db.ref(arr[i])) : _refs.push(_refs[i - 1].child(arr[i]));
            }

            return _refs[_refs.length - 1];

        } catch (err) {
            throw new Error(err);
        }
    }

}
