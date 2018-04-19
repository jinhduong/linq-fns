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
        .from(promiseApi).skipWhile(x => x.overall < 90);

    const data = await query.toList();
    console.log(data);
}

main();


