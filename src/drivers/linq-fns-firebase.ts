import { database } from './database.interface';
import { Queryable } from '..';
import { IMethods } from '../intefaces';

const admin = require('firebase-admin');

export class FireBaseQueryale {

    _db: database.Database;

    constructor(db: database.Database) {
        this._db = db;
    }

    getRepository<T>(repoName: string,
        predicate: (ref: database.Reference) => database.Query,
        action: database.EventType = "value"): IMethods<T> {

        const ref = this.getRefObject(repoName);
        return Queryable.from(
            new Promise<T[]>((resolve, reject) => {
                if (!predicate)
                    ref.on(action, (snapshot) => {
                        resolve(snapshot.val());
                    });
                else {
                    const query = predicate(ref);
                    query.on(action, (snapshot) => {
                        resolve(snapshot.val());
                    });
                }
            }));
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