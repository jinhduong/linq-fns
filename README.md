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
- [ ] selectMany
- [ ] join
- [ ] groupJoin
- [ ] orderBy
- [ ] orderByDescending
- [ ] thenBy
- [ ] thenByDescending
- [ ] take
- [ ] takeWhile
- [ ] skip
- [ ] groupBy
- [ ] distinct
- [ ] concat
- [ ] zip
- [ ] union
- [ ] intersect
- [ ] except
- [x] first : `Promise`
- [x] firstOrDefault : `Promise`
- [x] last : `Promise`
- [x] lastOrDefault : `Promise`
- [ ] single
- [ ] singleOrDefault
- [ ] elementAt
- [ ] elementAtOrDefault
- [ ] orderByDescending
- [ ] defaultIfEmpty
- [ ] contains
- [ ] reserve
- [ ] sequenceEqual
- [ ] any
- [ ] all
- [x] count : `Promise`
- [ ] longCount
- [ ] min
- [ ] max
- [ ] sum
- [ ] average
- [ ] aggregate
- [ ] toList : `Promise`


### License

[MIT License](http://opensource.org/licenses/MIT)
