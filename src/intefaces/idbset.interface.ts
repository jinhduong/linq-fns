import { IDbContext } from "./idbcontext.interface";
import { IEntity } from "./ientity.interface";

export interface IDbSet<T> {
    add(entity: T): void;
    update(entity: T): void;
    remove(entity: T): void;
    dbContext: IDbContext
    selfEntity: IEntity<T>
}