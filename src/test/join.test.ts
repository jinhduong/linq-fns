import { promiseApi, staticAreas, staticLoopkup } from './source';
import { expect } from 'chai';
import { Queryable } from '../implements/queryable';

describe('join', () => {
    async function run() {
        const queryable = new Queryable<{ name, nationId, overall }>();
        let query = queryable
            .from(promiseApi)
            .join(staticLoopkup, (x, y) => x.nationId === y.id)
            .join(staticAreas, (x, y) => x.y.areaId === y.id)
            .select(item => {
                return {
                    playerName: item.x.x.name,
                    nation: item.x.y.name,
                    area: item.y.areaName
                }
            });
        return {
            data: await query.toList(),
            originalData: await promiseApi as any[],
            distinct: staticLoopkup.map(x => x.areaId).filter(function (item, pos, self) {
                return self.indexOf(item) == pos;
            })
        }
    }

    it('items equal num of records from last array', async () => {
        const rs = await run();
        expect(rs.data.length).to.equal(rs.distinct.length)
    });

    it('result data always equal or less than original', async () => {
        const rs = await run();
        expect(rs.data.length).to.be.most(rs.distinct.length)
    })
});