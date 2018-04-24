import { IEntity } from "./ientity.interface";

export interface IDbAction<T> {
    entity: IEntity<T>;
    item: T,
    type: 'ADD' | 'UPD' | 'REM'
}