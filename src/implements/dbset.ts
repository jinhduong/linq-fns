import { IDbSet } from "../intefaces/idbset.interface";
import { IDbContext } from "../intefaces/idbcontext.interface";
import { IEntity } from "../intefaces/ientity.interface";

export class DbSet<T> implements IDbSet<T> {
    selfEntity: IEntity<T>;
    dbContext: IDbContext;

    add(entity: T): void {
        this.dbContext.add(this.selfEntity, entity)
    }

    update(entity: T): void {
        this.dbContext.update(this.selfEntity, entity);
    }

    remove(entity: T): void {
        this.dbContext.remove(this.selfEntity, entity);
    }
}