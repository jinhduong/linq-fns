import { promiseApi, staticAreas, staticLoopkup } from './source';
import { expect } from 'chai';
import { Queryable } from '../implements/queryable';

describe('selectMany', () => {
    async function run() {
        const queryable = new Queryable<{ name, nationId, overall, skills }>();
        let query = queryable
            .from(promiseApi)
            .selectMany(x => x.skills);

        return {
            data: await query.toList(),
            originalData: await promiseApi as any[],
            distinct: staticLoopkup.map(x => x.areaId).filter(function (item, pos, self) {
                return self.indexOf(item) == pos;
            })
        }
    }

    it('is fatten list (this case is number)', async () => {
        const rs = await run();
        expect(rs.data).to.satisfy((item) => {
            return rs.data.every((num) => Number.isInteger(num as number));
        });
    });
});