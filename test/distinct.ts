import { players, continents, nations } from './source';
import { expect } from 'chai';
import { Queryable } from '../dist';

describe('distinct', () => {
    const query = Queryable.from(nations)
        .join(continents, (x, y) => x.areaId === y.id)
        .select(x => x.y.areaName);

    it('can run', async () => {
        const first = await query.distinct();
        expect(first).to.not.equal(undefined);
    })
});