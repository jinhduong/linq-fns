import { IDbContext } from "../intefaces/idbcontext.interface";
import { IEntity } from "../intefaces/ientity.interface";
import { BaseDbContext } from "./baseDbContext";

export class LocalStogareDbContext extends BaseDbContext implements IDbContext {

    entities: IEntity<any>[];
    private DBNAME = '__LCS';
    private _db = {};

    constructor() {
        super();
        this.getData();
    }

    // Actions
    add<T>(entity: IEntity<T>, item: T) {
        this.actionCollection.push({
            entity: entity,
            item: item,
            type: 'ADD'
        })
    }

    update<T>(entity: IEntity<T>, item: T) {
        this.actionCollection.push({
            entity: entity,
            item: item,
            type: 'UPD'
        })
    }

    remove<T>(entity: IEntity<T>, item: T) {
        this.actionCollection.push({
            entity: entity,
            item: item,
            type: 'REM'
        })
    }

    commitChanges(): void {
        this.commit(() => {
            this.actionCollection.forEach(a => {
                if (a.type === 'ADD') this._add(a.entity, a.item);
                else if (a.type === 'UPD') this._update(a.entity, a.item);
                else this._delete(a.entity, a.item);
            });
        });
    }

    /// PRIVATE FUNCTIONS
    private getData(): any {
        const result = window.localStorage.getItem(this.DBNAME);
        this._db = JSON.parse(result);
    }

    private setData() {
        const jsonString = JSON.stringify(this._db);
        window.localStorage.setItem(this.DBNAME, jsonString);
    }

    private convert(jsonString: string) {
        return JSON.parse(jsonString);
    }

    private commit(fnc) {
        this.getData();
        fnc();
        this.setData();
    }

    private _add<T>(entity: IEntity<T>, item: T) {
        this._initCheckEntity(entity);
        (this._db[entity.columnName] as T[]).push(item);
    }

    private _update<T>(entity: IEntity<T>, item: T) {
        this._initCheckEntity(entity);
        (this._db[entity.columnName] as T[]).push(item);
    }

    private _delete<T>(entity: IEntity<T>, item: T) {
        this._initCheckEntity(entity);
        (this._db[entity.columnName] as T[]).push(item);
    }

    private _initCheckEntity(entity: IEntity<any>) {
        if (!this._db[entity.columnName])
            this._db[entity.columnName] = [];
    }
}