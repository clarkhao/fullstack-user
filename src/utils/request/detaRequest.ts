import axios from "axios";
import { AbstractAPI } from "./abstractAPI";
const config = require('config');

export default class DetaAPI extends AbstractAPI {
    private apiKey: string;
    private fileName: string;
    public constructor(name: string) {
        super(process.env[config.get('deta.home')] as string, process.env[config.get('deta.path')], "json");
        this.apiKey = process.env[config.get('deta.key')] as string;
        this.fileName = name;
    }
    public createAxios() {
        this.http = axios.create({
            baseURL: this.url,
            headers: {
                'Content-Type': this.contentType,
                'X-Api-Key': this.apiKey,
            },
            responseType: 'arraybuffer'
        })
    }
    public display() {
        console.log(`apikey: ${this.apiKey}`);
        console.log(`url: ${this.url.concat(`?name=${this.fileName}`)}`)
    }
    public readFile() {
        return this.http.get(this.url.concat(`?name=${this.fileName}`))
            .then(request => {
                const data = request.data as Buffer;
                const blob = new Blob([data]);
                return blob;
            })
            .catch(this.handleError.bind(this));
    }
}