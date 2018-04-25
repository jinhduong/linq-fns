import { IIterator } from "../intefaces/iterator.interface";

export class BaseIterator<T> implements IIterator<T> {
    nextSource: any[] | Promise<any>;

    replaceBySyncSource?(syncSource: T[]) {
        this.nextSource = syncSource;
    }

    hasSource(): boolean {
        return this.nextSource !== null && this.nextSource !== undefined;
    }

    execute(source: T[]) {
        throw new Error("Method not implemented.");
    }
}