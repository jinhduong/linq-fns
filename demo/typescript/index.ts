import { Queryable } from '../../dist';
const cTable = require('console.table');

let players = new Promise<{ name, overall, nationId, skills }[]>((resolve, reject) => {
    // skills: attack, stamia, speed, shoot
    console.log('get players...');
    setTimeout(() => {
        resolve([
            { name: 'Ronaldo', overall: 96, nationId: 1, skills: [96, 85, 87, 91] },
            { name: 'Messi', overall: 98, nationId: 2, skills: [97, 85, 91, 93] },
            { name: 'Mbappe', overall: 86, nationId: 3, skills: [89, 81, 95, 83] },
            { name: 'Matial', overall: 81, nationId: 3, skills: [81, 80, 89, 81] },
            { name: 'Salah', overall: 89, nationId: 4, skills: [88, 82, 97, 86] }
        ]);
    }, 1000);
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
    }, 2000);
})

let continents = new Promise<{ id, areaName }[]>(resolve => {
    console.log('get continents...');
    setTimeout(() => {
        resolve([
            { id: 1, areaName: 'Euro' },
            { id: 2, areaName: 'South America' },
        ]);
    }, 2300);
})

function main() {
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

    query.toList().then(data => {
        console.table(data)
    });
}

main();


