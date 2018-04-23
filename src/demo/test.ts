import { Queryable } from "../implements/queryable";

const queryable = new Queryable<{ name, nationId, overall, skills }>();

let promiseApi = new Promise((resolve, reject) => {
    // skills: attack, stamia, speed, shoot
    setTimeout(() => {
        console.log('...get data');
        resolve([
            { name: 'Ronaldo', overall: 96, nationId: 1, skills: [96, 85, 87, 91] },
            { name: 'Messi', overall: 98, nationId: 2, skills: [97, 85, 91, 93] },
            { name: 'Mbappe', overall: 86, nationId: 3, skills: [89, 81, 95, 83] },
            { name: 'Salah', overall: 89, nationId: 4, skills: [88, 82, 97, 86] }
        ]);
    }, 1000);
})

let nations = [
    { id: 1, name: 'Portugal', areaId: 1 },
    { id: 2, name: 'Argentina', areaId: 2 },
    { id: 3, name: 'France', areaId: 1 },
    { id: 4, name: 'Egypt', areaId: 3 }
]

let continents = [
    { id: 1, areaName: 'Euro' },
    { id: 2, areaName: 'South America' },
]

function main() {
    // Just query not execute query
    console.time('querytime');
    let query = queryable
        .from(promiseApi)
        .join(nations, (pl, na) => pl.nationId === na.id)
        .leftJoin(continents, (plNation, co) => plNation.y.areaId === co.id)
        .select(o => {
            return {
                playerName: o.x.name,
                overall: o.x.overall,
                nation: o.y.name,
                area: o.areaName
            }
        })
        .groupBy(x => x.area)
        .orderByDescending(x => x.key);

    console.timeEnd('querytime');

    console.time('executetime');
    const data = query.toList().then(data => {
        console.timeEnd('executetime');
        console.log(data);
        console.table(data);
    });
}

main();


