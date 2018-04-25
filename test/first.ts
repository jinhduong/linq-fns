import { players, continents, nations } from './source';
import { expect } from 'chai';
import { Queryable } from '../dist';

describe('first', () => {
    const query = Queryable.from(players);

    it('can run', async () => {
        const first = await query.first();
        expect(first).to.not.equal(undefined);
        expect(first).to.not.equal(null);
    })
});