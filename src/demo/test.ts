import { Queryable } from "../implements/queryable";

let promiseApi = new Promise((resolve, reject) => {
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

let nations: Promise<{ id, name, areaId }[]> = new Promise(resolve => {
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
    // Just query not execute query
    console.time('querytime');
    let query =
        Queryable
            .from(nations)
            .join(continents, (x, y) => x.areaId === y.id)
            .groupBy(o => o.y.areaName)
            .select(x => {
                let _tmp = {};
                return {
                    area: x.key,
                    total: Queryable.from(x.items).count()
                }
            })


    console.timeEnd('querytime');

    console.time('executetime');
    const data = query.toList().then(data => {
        console.timeEnd('executetime');
        console.log(data);
        console.table(data);
    });
}

main();


