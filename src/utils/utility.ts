export class Utils {
    public static isPromise(obj): boolean {
        return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
    }

    public static distinct(array: any[]): any[] {
        return array.filter((val, index, self) => {
            return self.indexOf(val) === index;
        }).filter(x => x != undefined);
    }

    public static getSingle(src: any[]): any {
        if (src.length > 1) throw new Error("The collection does not contain exactly one element");
        else if (src.length === 1)
            return src[0];
    }

    public static compare(obj: any, obj2: any): boolean {
        if (obj === obj2) return true;

        const objIsArray = Array.isArray(obj);
        const obj2IsArray = Array.isArray(obj2);

        if (objIsArray && obj2IsArray) {

            if ((obj as any[]).length !== (obj2 as any[]).length) return false;

            for (let i = 0, li = obj.length; i < li; i++) {
                const result = this.compare(obj[i], obj2[i]);
                if (!result) return false;
            }

            return true;

        } else {
            const objIsObject = typeof obj === 'object';
            const obj2IsObject = typeof obj2 === 'object';

            if (objIsObject && obj2IsObject) {
                const props = Object.keys(objIsObject);

                for (let i = 0, li = props.length; i < li; i++) {
                    const result = this.compare(objIsObject[props[i]], obj2IsObject[props[i]]);
                    if (!result) return false;
                }

                return true;
            }

            return false;
        }
    }
}