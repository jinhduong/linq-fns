import { Queryable } from '../implements/index';
import { LocalStorageQueryable } from '../drivers/linq-fns.localStogare';
import { GistQueryable } from '../drivers/linq-fns.gits';

window['Queryable'] = Queryable
window['LocalStorageQueryable'] = LocalStorageQueryable;
window['GistQueryable'] = GistQueryable;