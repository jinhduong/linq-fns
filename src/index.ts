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

console.log(query.toList())
// [{name:'Ronaldo', overall: 96}, {name:'Messi', overall: 98}]

let query1 = query
    .where(x => x.overall > 96)
    .select(x => `Best player is ${x.name}`);

console.log(query1.toList())
// ['Best player is Messi']
