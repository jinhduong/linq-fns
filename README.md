# 👴 eslinq
.NET LINQ for Javascript, written by TypeScript.
- Provide `IQueryable<T>`, it's reusable, also variable and use `iterator list` for holding query and execute.
- Contains almost the original .NET and some extends methods.

### Example
```ts
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
    // Just query
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

    // call toList() to execute data
    const data = query.toList().then(data => {
        console.log(data);
    });
    
    // [{ keys: "Euro", items: [{ playerName: "Ronaldo",... }, { playerName:"Mbappe",... }] },
    //  { keys: "South America", items: [ { playerName: "Messi" }]
    // ]
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
- [x] take
- [x] takeWhile
- [x] skip
- [x] skipWhile
- [x] groupBy
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
