import { LocalStogareDbContext } from "../implements/localStogareDbContext";

const dbContext = new LocalStogareDbContext();

dbContext.setup([
    { columnName: "post" },
    { columnName: "person" }
])

const postRepository = dbContext.get<{ id, name, created?}>("post").dbSet;

postRepository.add({ id: 1, name: "123" });
postRepository.add({ id: 2, name: "123" });
postRepository.add({ id: 3, name: "123" });

dbContext.commitChanges();





