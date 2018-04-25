import { IteratorMethods } from './methods';
import { IMethods } from '../intefaces';

export class SyncIteratorMethods<T> extends IteratorMethods<T> implements IMethods<T>{
    runIterators(): any {
        let _result = Object.assign([], this._source);
        this._iteratorCollection.forEach(ite => {
            _result = ite.execute(_result);
        })
        return _result;
    }
}