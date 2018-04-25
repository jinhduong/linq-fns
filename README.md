# 👴 eslinq
.NET LINQ for Javascript, written by TypeScript.
- Provide `IQueryable<T>`, it's reusable, also variable and use `iterator list` for holding query and execute.
- Contains almost the original .NET and some extends methods.
- Support `Promise` like a input source.

### Basic example
```ts
let query = Queryable
            .from(nations)
            .join(continents, (x, y) => x.areaId === y.id)
            .groupBy(o => o.y.areaName)
            .select(x => {
                return {
                    area: x.key,
                    total: Queryable.fromSync(x.items).count() // Here will return number, not Promise<number>
                }
            })
const asyncData = query.toList() // Will return Promise<{area:string, total:number}>
asyncData.then(data => {
    console.log(data);
    // [
    //     {area: 'Euro': total: 2},
    //     {area:'South Ameria', total: 1}
    // ]
});
```

### Sample data ⚽
This document will use below data to make examples :
```ts
let players = new Promise((resolve, reject) => {
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
```

### Queryable 
#### .from() => `Promise<any>`:
 All data source will be converted to `Promise` notwithstanding that source is Promise or noramlly array data. Then once we call `toList()`, `count()`, `first()`... or any `execute methods` it will be return a `Promise`.

 ```ts
let query = Queryable
            .from(nations)
            .join(continents, (x, y) => x.areaId === y.id)
            .groupBy(o => o.y.areaName)

const asyncData = query.count() // Will return Promise<number>
asyncData.then(num => {
    console.log(num);
    // 2
})
 ```

#### .fromSync => `any`: 
It's often use inside sub-query which are after all data already retrieved successfully or you make sure the input source is sync data like as `Array`.
``` ts
let query = Queryable
            .from(nations)
            .join(continents, (x, y) => x.areaId === y.id)
            .groupBy(o => o.y.areaName)
            .select(x => {
                return {
                    area: x.key,
                    total: Queryable.fromSync(x.items).count() // Here will return number, not Promise<number>
                }
            })
const asyncData = query.toList() // Will return Promise<{area:string, total:number}>
asyncData.then(data => {
    console.log(data);
    // [
    //     {area: 'Euro': total: 2},
    //     {area:'South Ameria', total: 1}
    // ]
});
```

> **> More**: at `from` method, all input sources at `from, join, leftJoin` methods,... will be converted to **Promise** and use **Promise.all** to **execute** and then use **Iterator collection** to query data and once faced **excuting methods** like as `toList(), first()` it will return data which be inside a Promise.

### IMethods
#### .clone() => IMethods:
Make new `IMethods` instance from a exists `Queryable`. New one will keep the `Iterator collection` and `source` but not affect to previous `Queryable`.
It's useful when we make the common `Queryable` and then use it to many other places.
```ts
// Just where over > 85
let query = Queryable
    .from(players)
    .where(x => x.overall > 85);

// Continue from `query` and select player and nation 
let query1 = query.clone()
    .join(nations, (x, y) => x.nationId === y.id)
    .select(o => {
        return {
            playerName: o.x.name,
            nation: o.y.name
        }
    });

// Continue from `query` and calculate real overall each players
let query2 = query.clone()
    .select(o => {
        return {
            name: o.name,
            realOverall: Queryable.fromSync(o.skills).avarage()
        }
    }).orderByDescending(x => x.realOverall);


query.toList().then(data => console.table(data));
// name     overall  nationId  skills     
// -------  -------  --------  -----------
// Ronaldo  96       1         96,85,87,91
// Messi    98       2         97,85,91,93
// Mbappe   86       3         89,81,95,83
// Salah    89       4         88,82,97,86

query1.toList().then(data => console.table(data));
// playerName  nation   
// ----------  ---------
// Ronaldo     Portugal 
// Messi       Argentina
// Mbappe      France   
// Salah       Egypt 

query2.toList().then(data => console.table(data));
// name     realOverall
// -------  -----------
// Messi    91.5       
// Ronaldo  89.75      
// Salah    88.25      
// Mbappe   87
```

#### .where(condition) => IMethod:
```ts
let query = Queryable
        .from(players)
        .where(x => x.overall > 85);

query.toList().then(data => console.table(data));
// name     overall  nationId  skills     
// -------  -------  --------  -----------
// Ronaldo  96       1         96,85,87,91
// Messi    98       2         97,85,91,93
// Mbappe   86       3         89,81,95,83
// Salah    89       4         88,82,97,86
```

#### .select(iterator) => IMethods
```ts
let query = Queryable
        .from(players)
        .where(x => x.overall > 85)
        .select(o => {
            return {
                name: o.name,
                realOverall: Queryable.fromSync(o.skills).avarage()
            }

query.toList().then(data => console.table(data));
// name     realOverall
// -------  -----------
// Messi    91.5       
// Ronaldo  89.75      
// Salah    88.25      
// Mbappe   87
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
- [x] contains
- [ ] reserve
- [ ] sequenceEqual
- [x] any : `Promise<boolean>`
- [ ] all
- [x] count : `Promise<number>`
- [x] min : `Promise<number>`
- [x] max : `Promise<number>`
- [x] sum : `Promise<number>`
- [x] average
- [ ] aggregate
- [x] toList : `Promise<T[]>`


### License

[MIT License](http://opensource.org/licenses/MIT)
