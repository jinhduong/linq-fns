import { Queryable } from "../implements/queryable";

let promiseApi = new Promise((resolve, reject) => {
    // skills: attack, stamia, speed, shoot
    setTimeout(() => {
        console.log('...get data');
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
    setTimeout(() => {
        resolve([
            { id: 1, name: 'Portugal', areaId: 1 },
            { id: 2, name: 'Argentina', areaId: 2 },
            { id: 3, name: 'France', areaId: 1 },
            { id: 4, name: 'Egypt', areaId: 3 }
        ]);
    }, 1000);
})

let continents = new Promise<{ id, areaName }[]>(resolve => {
    setTimeout(() => {
        resolve([
            { id: 1, areaName: 'Euro' },
            { id: 2, areaName: 'South America' },
        ]);
    }, 1000);
})


function main() {
    // Just query not execute query
    console.time('querytime');
    let query =
        Queryable
            .from(nations)
            .join(continents, (x, y) => x.areaId === y.id)
            .select(o => {
                return {
                    nation: o.x.name,
                    area: o.y.areaName
                }
            });

    console.timeEnd('querytime');

    console.time('executetime');
    const data = query.toList().then(data => {
        console.timeEnd('executetime');
        console.log(data);
        console.table(data);
    });
}

main();


