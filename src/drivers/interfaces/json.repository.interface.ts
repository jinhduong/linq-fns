export interface IJsonRepository<T> {
    readData(data: Object)
    writeData(data: Object);
}