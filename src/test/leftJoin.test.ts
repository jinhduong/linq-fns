import { promiseApi, staticAreas, staticLoopkup } from './source';
import { expect } from 'chai';
import { Queryable } from '../implements/queryable';

describe('left join', () => {
    async function run() {
        const queryable = new Queryable<{ name, nationId, overall }>();
        let query = queryable
            .from(promiseApi)
            .join(staticLoopkup, (x, y) => x.nationId === y.id)
            .leftJoin(staticAreas, (x, y) => x.y.areaId === y.id)
            .select(item => {
                return {
                    name: item.x.name,
                    area: item.areaName
                }
            });
        return {
            data: await query.toList(),
            originalData: await promiseApi as any[]
        }
    }

    it('keep num of items', async () => {
        const rs = await run();
        expect(rs.data.length).to.equal(rs.originalData.length)
    });

    it('last one didn\'t join', async () => {
        const rs = await run();
        expect(rs.data[rs.data.length - 1].area).to.equal(undefined);
    })

    it('first one get exists data', async () => {
        const rs = await run();
        expect(rs.data[0].area).not.equal(undefined);
    })
});