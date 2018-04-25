import { Queryable } from "../dist";
import { nations, players, continents } from "./source";
import { expect } from "chai";

describe('join', () => {
    const query = Queryable.from(players)
        .join(nations, (x, y) => x.nationId === y.id)

    it('can run', () => {
        query.toList().then(data => {
            expect(data).not.equal(undefined);
        });
    });

    it('put out {x,y} object have value', () => {
        query.toList().then(data => {
            expect(data[0].x).not.equal(undefined);
            expect(data[0].y).not.equal(undefined);
            expect(data[0].y).not.equal(null);
            expect(data[0].y).not.equal(null);
        });
    });

    it('cannot over original length', () => {
        Promise.all([query.toList(), players]).then((arr: any[]) => {
            expect(arr[0].length).not.greaterThan(arr[1].length);
        });
    })
});