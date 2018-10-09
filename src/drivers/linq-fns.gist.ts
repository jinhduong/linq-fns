import { JsonQueryable } from './linq-fns.json';
import { IJsonRepository } from './interfaces/json.repository.interface';
import axios from 'axios';

export class GistQueryable<T> extends JsonQueryable<T> implements IJsonRepository<T>{
    private _dbName = '_lqfnsDb';
    private _gistApiUrl = 'https://api.github.com/gists';
    private _gistFileId;
    private _token;
    private _fileName;
    private jsonFormat = {
        "description": "",
        "public": true,
        "files": {
        }
    }

    constructor(gistFileId: string, token: string, repoName: string, key?: string) {
        super(repoName, key);
        this._gistFileId = gistFileId;
        this._token = token;
    }

    readData() {
        return axios.get(`${this._gistApiUrl}/${this._gistFileId}`)
            .then((response: any) => {
                this._fileName = Object.keys((response.data.files as Object))[0];
                this.updateJsonFormat(response.data);

                const _content = response.data.files[this._fileName].content;
                if (!_content) return {};
                if (typeof JSON.parse(_content) === 'string') return JSON.parse(JSON.parse(_content));
                return JSON.parse(_content);
            });
    }

    writeData(obj: Object) {
        this.jsonFormat.files[this._fileName].content = JSON.stringify(obj);
        return axios.patch(`${this._gistApiUrl}/${this._gistFileId}?access_token=${this._token}`, this.jsonFormat)
            .then(response => {
                return true;
            });
    }

    private updateJsonFormat(data) {
        this.jsonFormat.description = data.description;
        this.jsonFormat.files[this._fileName] = {};
        this.jsonFormat.files[this._fileName].content = data.files[this._fileName].content
    }
}