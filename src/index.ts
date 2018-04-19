import { Queryable } from "./implements/queryable";

const queryable = new Queryable<{ name, overall }>();

let promiseApi = new Promise((resolve, reject) => {
    // Fake data from api
    setTimeout(() => {
        console.log('...get data');
        resolve([
            { name: 'Ronaldo', overall: 96 },
            { name: 'Messi', overall: 98 },
            { name: 'Mbappe', overall: 86 },
        ]);
    }, 3000);
})

async function main() {
    // Just query not execute query
    let query = queryable
        .from(promiseApi)
        .where(x => x.overall > 90);

    const count = await query.count(x => x.overall > 96);
    console.log(count)
    // 2

    let query1 = query
        .where(x => x.overall > 96)
        .select(x => `Best player is ${x.name}`);

    const num1 = await query1.toList();
    console.log(num1)

}

main();


