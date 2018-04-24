import { IDbContext } from "../intefaces/idbcontext.interface";
import { IEntity } from "../intefaces/ientity.interface";
import { IDbAction } from "../intefaces/idbAction.interface";
import { IDbSet } from "../intefaces/idbset.interface";
import { DbSet } from "./dbset";

export class BaseDbContext implements IDbContext {
  
    actionCollection: IDbAction<any>[] = [];

    entities: IEntity<any>[] = [];    

    commitChanges(): void {
        throw new Error("Method not implemented.");
    }

    add<T>(entity: IEntity<T>, item: T) {
        throw new Error("Method not implemented.");
    }

    update<T>(entity: IEntity<T>, item: T) {
        throw new Error("Method not implemented.");
    }

    remove<T>(entity: IEntity<T>, item: T) {
        throw new Error("Method not implemented.");
    }


    get<T>(columnName: string): IEntity<T> {
        const entity = this.entities.find(x => x.columnName === columnName);
        if (entity) return entity;
        throw new Error(`Cannot found entity ${columnName}`);
    }

    setup(entities: IEntity<any>[]): void {
        entities.forEach(ent => {
            ent.dbSet = new DbSet();
            ent.dbSet.dbContext = this;
            ent.dbSet.selfEntity = ent;
            this.entities.push(ent);
        });
    }
}