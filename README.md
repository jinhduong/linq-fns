# eslinq
.NET LINQ for Javascript, written by TypeScript.
- Provide `IQueryable<T>`, it's reusable, also variable and use `iterator list` to call query.
- Contains all the original .NET methods
- Support `strong typing`

### Example
```js
import { Queryable } from "../implements/queryable";

const queryable = new Queryable<{ name, nationId, overall, skills }>();

let promiseApi = new Promise((resolve, reject) => {
    // Fake data from api
    setTimeout(() => {
        console.log('...get data');
        resolve([
            { name: 'Ronaldo', overall: 96, nationId: 1, skills: [97, 90, 86, 95] },
            { name: 'Messi', overall: 98, nationId: 2, skills: [97, 90, 86, 95] },
            { name: 'Mbappe', overall: 86, nationId: 3, skills: [97, 90, 86, 95] },
            { name: 'Salah', overall: 89, nationId: 4, skills: [97, 90, 86, 95] }
        ]);
    }, 1000);
})

let staticLoopkup = [
    { id: 1, name: 'Portugal', areaId: 1 },
    { id: 2, name: 'Argentina', areaId: 2 },
    { id: 3, name: 'France', areaId: 1 },
    { id: 4, name: 'Egypt', areaId: 3 }
]

let staticAreas = [
    { id: 1, areaName: 'Euro' },
    { id: 2, areaName: 'South America' },
]

async function main() {
    // Just query not call promise
    let query = queryable
        .from(promiseApi)
        .join(staticLoopkup, (x, y) => x.nationId == y.id)
        .select((o) => {
            return {
                playerName: o.x.name,
                overall: o.x.overall,
                nation: o.y.name
            };
        })
        .orderBy(x => x.playerName);

    // Call promise and execute all query methods
    const data = await query.toList();
    console.log(data);

}

main();
```

### Process
- [x] from
- [x] where
- [x] select
- [x] selectMany
- [x] join
- [x] leftJoin
- [ ] groupJoin
- [x] orderBy
- [x] orderByDescending
- [ ] thenBy
- [ ] thenByDescending
- [x] take
- [x] takeWhile
- [x] skip
- [x] skipWhile
- [ ] groupBy
- [ ] distinct
- [ ] concat
- [ ] zip
- [ ] union
- [ ] intersect
- [ ] except
- [x] first : `Promise<T>`
- [x] firstOrDefault : `Promise<T | null>`
- [x] last : `Promise<T>`
- [x] lastOrDefault : `Promise<T | null>`
- [x] single
- [x] singleOrDefault
- [ ] elementAt
- [ ] elementAtOrDefault
- [ ] orderByDescending
- [ ] defaultIfEmpty
- [ ] contains
- [ ] reserve
- [ ] sequenceEqual
- [x] any : `Promise<boolean>`
- [ ] all
- [x] count : `Promise<number>`
- [ ] longCount
- [x] min : `Promise<number>`
- [x] max : `Promise<number>`
- [x] sum : `Promise<number>`
- [x] average
- [ ] aggregate
- [x] toList : `Promise<T[]>`


### License

[MIT License](http://opensource.org/licenses/MIT)
