import { Queryable } from "../dist";
import { nations, players, continents } from "./source";
import { expect } from "chai";

describe('leftJoin', () => {
    const query = Queryable.from(players)
        .leftJoin(nations, (x, y) => x.nationId === y.id);

    it('can run', () => {
        query.toList().then(data => {
            expect(data).not.equal(undefined);
        });
    });

    it('all properties in new object is inside input object properties', () => {
        Promise.all([query.toList(), players, nations]).then((arr: any[]) => {
            const arr0Keys = Object.keys(arr[0][0]);
            const arr1Keys = Object.keys(arr[1][0]);
            const arr2Keys = Object.keys(arr[2][0]);

            arr1Keys.forEach(p => {
                expect(arr0Keys.includes(p)).to.equal(true);
            })

            arr2Keys.forEach(p => {
                expect(arr0Keys.includes(p)).to.equal(true);
            })
        });
    })
});