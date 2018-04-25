export class Utils {
    public static isPromise(obj) {
        return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
    }
    
    public static distinct(array: any[]) {
        return array.filter((val, index, self) => {
            return self.indexOf(val) === index;
        }).filter(x => x != undefined);
    }
}