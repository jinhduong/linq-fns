import { IDbSet } from "./idbset.interface";
import { IEntity } from "./ientity.interface";
import { IDbAction } from "./idbAction.interface";

export interface IDbContext {
    entities: IEntity<any>[];

    actionCollection: IDbAction<any>[];

    // set default dbSet
    setup(entities: IEntity<any>[]): void;

    get<T>(columnName: string): IEntity<T>;

    // Actions

    add<T>(entity: IEntity<T>, item: T);

    update<T>(entity: IEntity<T>, item: T);

    remove<T>(entity: IEntity<T>, item: T);

    commitChanges(): void;
}