import { Queryable } from "./implements/queryable";

const queryable = new Queryable<{ name, overall, nationId }>();

let promiseApi = new Promise((resolve, reject) => {
    // Fake data from api
    setTimeout(() => {
        console.log('...get data');
        resolve([
            { name: 'Ronaldo', overall: 96, nationId: 1 },
            { name: 'Messi', overall: 98, nationId: 2 },
            { name: 'Mbappe', overall: 86, nationId: 3 },
        ]);
    }, 1000);
})

let staticLoopkup = [
    { id: 1, name: 'Portugal' },
    { id: 2, name: 'Argentina' },
    { id: 3, name: 'France' },
]

async function main() {
    // Just query not execute query
    let query = queryable
        .from(promiseApi)
        .join(staticLoopkup, (x, y) => x.nationId === y.id)
        .select(item => {
            return {
                playerName: item.x.name,
                nation: item.y.name
            };
        });

    const data = await query.toList();
    console.log(data);
}

main();


