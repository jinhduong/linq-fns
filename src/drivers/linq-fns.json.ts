import { BaseRepository } from './base.repository';
import { IRepository } from './interfaces/repository.interface';
import { IJsonRepository } from './interfaces/json.repository.interface';
import { IMethods } from '../intefaces';
import { Queryable } from '../implements';
import { Utils } from '../utils';
const uniqid = require('uniqid');

export class JsonQueryable<T> extends BaseRepository<T> implements IJsonRepository<T>, IRepository<T>  {

    globalData: {};
    private _repoName = '';
    private _key;
    private _keyProp = '__id';

    readData(): any | Promise<any> {
        throw new Error("Method not implemented.");
    }

    writeData(data: Object): void {
        throw new Error("Method not implemented.");
    }

    constructor(repoName: string, key?: string) {
        super();
        setTimeout(() => {
            if (Utils.isPromise(this.readData())) {
                (this.readData() as Promise<any>).then(x => this.globalData = x);
            } else
                this.globalData = this.readData();
        }, 0);
        this._repoName = repoName;
        this._key = key;
    }

    getQuery(): IMethods<T> {
        return Queryable.from(this.tableData());
    }

    _add(item: T) {
        this.tableData().push(this.prepareData(item));
    }

    _remove<S extends T & { __id }>(item: S) {
        const removeItem = !this._key
            ? this.tableData<S>().find(x => x.__id === item.__id)
            : this.tableData<S>().find(x => x[this._key] === item[this._key]);

        const index = this.tableData().indexOf(removeItem);
        if (index > -1) this.tableData().splice(index, 1);
    }

    _update<S extends T & { __id }>(item: S) {
        const removeItem = !this._key
            ? this.tableData<S>().find(x => x.__id === item.__id)
            : this.tableData<S>().find(x => x[this._key] === item[this._key]);

        const index = this.tableData().indexOf(removeItem);
        if (index > -1) this.tableData()[index] = item;
    }

    private tableData<T>(): T[] {
        if (!this.globalData[this._repoName])
            this.globalData[this._repoName] = [];

        return this.globalData[this._repoName];
    }

    private prepareData(item: T) {
        if (!this._key)
            item[this._keyProp] = uniqid();
        return item;
    }

    finalCallback() {
        this.writeData(this.globalData);
    }
}