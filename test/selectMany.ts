import { players, continents, nations } from './source';
import { expect } from 'chai';
import { Queryable } from '../dist';

describe('selectMany', () => {
    const query = Queryable.from(players)
        .selectMany(x => x.skills);

    it('is fatten list (this case is number)', async () => {
        const data: any[] = await query.toList();
        data.forEach(item => {
            expect(Number.isInteger(item)).to.equal(true)
        });
    })
});