import { JsonQueryable } from './linq-fns.json';
import { IJsonRepository } from './interfaces/json.repository.interface';

export class LocalStorageQueryable<T> extends JsonQueryable<T> implements IJsonRepository<T>{

    private _dbName = '__lqfnsDb';

    constructor(repoName: string, key?: string) {
        super(repoName, key);
    }

    readData() {
        const dbString = localStorage.getItem(this._dbName || '__lqfnsDb');
        if (dbString)
            return JSON.parse(dbString);
        return {};
    }

    writeData(obj: Object): boolean {
        const dbString = JSON.stringify(obj);
        localStorage.setItem(this._dbName, dbString);
        return true;
    }
}