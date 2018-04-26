import { Queryable } from '../implements';
import { precompile } from 'handlebars';
const cTable = require('console.table');

let players = new Promise<{ name, overall, nationId, skills }[]>((resolve, reject) => {
    // skills: attack, stamia, speed, shoot
    console.log('get players...');
    setTimeout(() => {
        resolve([
            { name: 'Ronaldo', overall: 96, nationId: 1, skills: [96, 85, 87, 91] },
            { name: 'Messi', overall: 98, nationId: 2, skills: [97, 85, 91, 93] },
            { name: 'Mbappe', overall: 86, nationId: 3, skills: [89, 81, 95, 83] },
            { name: 'Matial', overall: 81, nationId: 3, skills: [81, 81, 89, 81] },
            { name: 'Salah', overall: 89, nationId: 4, skills: [88, 82, 97, 86] }
        ]);
    }, 100);
})

let players2 = new Promise<{ name, overall, nationId, skills }[]>((resolve, reject) => {
    // skills: attack, stamia, speed, shoot
    console.log('get players...');
    setTimeout(() => {
        resolve([
            { name: 'Ronaldo', overall: 96, nationId: 1, skills: [96, 85, 87, 91] },
            { name: 'Messi', overall: 98, nationId: 2, skills: [97, 85, 91, 93] },
            { name: 'Pogba', overall: 89, nationId: 3, skills: [85, 87, 84, 83] },
            { name: 'Mane', overall: 85, nationId: 3, skills: [85, 84, 92, 81] },
            { name: 'Levandowski', overall: 93, nationId: 4, skills: [96, 79, 82, 95] }
        ]);
    }, 150);
})

let nations = new Promise<{ id, name, areaId }[]>(resolve => {
    console.log('get nations...');
    setTimeout(() => {
        resolve([
            { id: 1, name: 'Portugal', areaId: 1 },
            { id: 2, name: 'Argentina', areaId: 2 },
            { id: 3, name: 'France', areaId: 1 },
            { id: 4, name: 'Egypt', areaId: 3 }
        ]);
    }, 200);
})

let continents = new Promise<{ id, areaName }[]>(resolve => {
    console.log('get continents...');
    setTimeout(() => {
        resolve([
            { id: 1, areaName: 'Euro' },
            { id: 2, areaName: 'South America' },
        ]);
    }, 300);
})

function main() {

    let query11 = Queryable
        .from(players)
        .sequencyEqual(players2)

    query11.then(x => console.log(x));

    let query12 = Queryable
        .from(players)
        .aggregate((pre, cur) => {
            if (typeof pre === "string")
                return pre + cur.name;
            else
                return pre.name + cur.name;
        });

    // query12.then(x => console.log(x));

    let query13 = Queryable
        .from(players)
        .zip(nations, (x, y) => {
            return {
                name: x.name,
                nation: y.name
            }
        });

    // query13.toList().then(x => console.table(x));

    let query14 = Queryable
        .from(players)
        .except(players2);

    // query14.toList().then(x => console.table(x));

    let query15 = Queryable
        .from(players)
        .intersect(players2)

    // query15.toList().then(x => console.table(x));

    let query20 = Queryable
        .from(players)
        .union(players);

    // query20.toList().then(x => console.table(x));

    let query10 = Queryable
        .from(players)
        .selectMany(x => x.skills)
        .distinct();

    // query10.toList().then(d => console.table(d));

    let query9 = Queryable
        .from(players)
        .concat(players);

    // query9.toList().then(d => console.table(d));

    let query = Queryable
        .from(players)
        .where(x => x.overall > 85)
        .select(x => {
            return {
                name: x.name,
                stars: (() => { x.overall > 90 ? 5 : 4 })(),
                realOverall: Queryable.fromSync(x.skills).avarage(),
                nationId: x.nationId
            }
        })
        .join(nations, (x, y) => x.nationId == y.id)
        .leftJoin(continents, (plNation, con) => plNation.y.areaId == con.id)
        .select(x => {
            return {
                name: x.x.name,
                stars: x.x.stars,
                realOverall: x.x.realOverall,
                nation: x.y.name,
                area: x.areaName
            }
        })
        .groupBy(x => x.area)
        .select(x => {
            return {
                area: x.key,
                avg: (Queryable.fromSync(x.items).avarage(x => x.realOverall))
            }
        });

    // query.toList().then(data => {
    //     console.table(data)
    // });
}

main();


