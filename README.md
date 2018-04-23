# eslinq
.NET LINQ for Javascript, written by TypeScript.
- Provide `IQueryable<T>`, it's reusable, also variable and use `iterator list` to call query.
- Contains all the original .NET methods
- Support `strong typing`

### Example
```js
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

    const count = await query.count();
    console.log(count)
    // 2

    let query1 = query
        .where(x => x.overall > 96)
        .select(x => `Best player is ${x.name}`);

    const num1 = await query1.toList();
    console.log(num1)
    // ['Best player is Messi']
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
- [x] toList : `Promise<T>`


### License

[MIT License](http://opensource.org/licenses/MIT)
