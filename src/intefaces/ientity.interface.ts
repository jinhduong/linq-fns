import { IDbSet } from "./idbset.interface";
import { IDbContext } from "./idbcontext.interface";

export interface IEntity<T> {
    columnName: string;
    dbSet?: IDbSet<T>;
}