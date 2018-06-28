# linq-fns
.NET LINQ functions for JavaScript written in TypeScript.
- ⚡ Provides `Queryable<T>`,which is reusable, variable and uses a *predicate collection* for deferred execution.
- 🔨 Contains most of the original .NET methods and some additional methods.
- 🔨 Supports `Promise` as an input source.
- 🙅 All `APIs` are JavaScript native methods so can be easily incorporated into existing JavaScript projects.
- 📊 Includes some simple drivers (such as `Firebase Realtime database`).

```js
npm install linq-fns --save
```

> This version is an alpha release so if you have any problems, please don't hesitate to let me know. 👋

Browser client files can be found in the [release](https://github.com/jinhduong/linq-fns/tree/master/release) folder.

### Basic example
#### Node or browser
```ts
// ES6
import { Queryable } from 'linq-fns';
// ES5
const Queryable = require('linq-fns').Queryable;

let query = Queryable
            .from(nations)
            .join(continents, (x, y) => x.areaId === y.id)
            .groupBy(o => o.y.areaName)
            .select(x => {
                return {
                    area: x.key,
                    total: Queryable.fromSync(x.items).count() 
                    // This will return a number, not Promise<number>
                }
            })

// Async/ await
const data = await query.toList();

// Promise
// Will return Promise<{area:string, total:number}>
const asyncData = query.toList(); 
asyncData.then(data => {
    console.log(data);
    // [
    //     {area: 'Euro': total: 2},
    //     {area:'South America', total: 1}
    // ]
});
```

#### Firebase
``` ts
const FireBaseQueryable = require('linq-fns').FireBaseQueryable;
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://xxx.firebaseio.com'
});

const db = admin.database();
const postsRepo = new FireBaseQueryable(db,'<yourdb>.posts');

// READ AND QUERY DATA
// ES5 Promise
postsRepo.getQuery()
    .where('...')
    .select('...')
    .toList().then(x=>'...');

// Async/await
const data = await postsRepo.getQuery()
                            .where('...')
                            .select('...')
                            .toList();

// WRITE DATA
// Prepare calls, but do not send requests to server
postsRepo.add(item);
postsRepo.remove(item);
postsRepo.update(item);

// Call this to execute 3 above methods
postsRepo.commitChanges();

```

#### localStorage
```js

// Node
const LocalStorageQueryable = require('linq-fns').LocalStorageQueryable;
const postsRepo = new LocalStorageQueryable("posts");

postsRepo.add(item);
postsRepo.remove(item);
postsRepo.update(item);

// Call this to execute 3 above methods
postsRepo.commitChanges();
```

#### gist file
```js

//Node
const GistQueryable = require('linq-fns').GistQueryable;
const postsRepo = new GistQueryable(
    "6d183b7f997819cd5a8354f35c1e471f123", // gist file
    "259f97b96762c9d3a155630d12321fd1cfaf253ff", // access token
    "posts") // table name

postsRepo.add(item);
postsRepo.remove(item);
postsRepo.update(item);
postsRepo.commitChanges();
```

### Process
#### 1.Methods
- [x] from
- [x] where
- [x] select
- [x] selectMany
- [x] join
- [x] leftJoin
- [x] groupJoin
- [x] orderBy
- [x] orderByDescending
- [x] take
- [x] takeWhile
- [x] skip
- [x] skipWhile
- [x] groupBy
- [x] distinct
- [x] concat
- [x] zip
- [x] union
- [x] intersect
- [x] except
- [x] first : `Promise<T>`
- [x] firstOrDefault : `Promise<T | null>`
- [x] last : `Promise<T>`
- [x] lastOrDefault : `Promise<T | null>`
- [x] single
- [x] singleOrDefault
- [x] contains
- [x] sequenceEqual
- [x] any : `Promise<boolean>`
- [x] all : `Promise<boolean>`
- [x] count : `Promise<number>`
- [x] min : `Promise<number>`
- [x] max : `Promise<number>`
- [x] sum : `Promise<number>`
- [x] average
- [x] aggregate
- [x] toList : `Promise<T[]>`

#### 2. Drivers
- [x] Firebase : `Node`
- [x] Localstorage : `Node` & `Browser`
- [x] Gists Github : `Node` & `Browser`
- [ ] ...

### Documents
https://github.com/jinhduong/linq-fns/tree/docs

### License

[MIT License](http://opensource.org/licenses/MIT)
