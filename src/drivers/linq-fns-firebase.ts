import { database } from './database.interface';
import { Queryable } from '..';
import { IMethods } from '../intefaces';

const admin = require('firebase-admin');

export class FireBaseQueryale {
    _db: database.Database;

    constructor(db: database.Database) {
        this._db = db;
    }

    getQuery<T>(name: string, limitType?: 'first' | 'last', limit?: number): IMethods<T> {
        const promise = this.getPromiseSource(name, limitType, limit);
        return Queryable.from(promise) as IMethods<T>;
    }

    getPromiseSource<T>(name: string, limitType?: 'first' | 'last', limit?: number): Promise<T[]> {
        let _methodName = (limitType === 'first' ? 'limitToFirst' : 'limitToLast');
        const ref = this.getRefObject(name);
        const promise: Promise<T[]> = new Promise((resolve, reject) => {
            (limitType ? ref[_methodName](limit) : ref)['on']('value', (snapshot) => {
                const _data: Object = snapshot.val();
                if (!_data)
                    return resolve([]);
                const _arrayedData = Object.keys(_data).map(prop => {
                    _data[prop]['__id'] = prop;
                    return _data[prop];
                });
                resolve(_arrayedData);
            });
        });
        return promise;
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