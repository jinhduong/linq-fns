import { Queryable } from "./implements/queryable";

const queryable = new Queryable<{ name, overall }>();
let source = [
    { name: 'Ronaldo', overall: 96 },
    { name: 'Messi', overall: 98 },
    { name: 'Mbappe', overall: 86 },
]

let query = queryable
    .from(source)
    .where(x => x.overall > 90);

query.count().then(x => console.log(x))
// [{name:'Ronaldo', overall: 96}, {name:'Messi', overall: 98}]

let query1 = query
    .where(x => x.overall > 96)
    .select(x => `Best player is ${x.name}`);

query1.toList().then(res => console.log(res));
// ['Best player is Messi']
