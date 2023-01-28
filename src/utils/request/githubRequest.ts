import { AbstractAPI } from "./abstractAPI";
const config = require('config');

export default class GithubAPI extends AbstractAPI {
    private client_id: string;
    private client_secret: string;
    private code: string;
    public constructor(code?:string) {
        super(config.get('github.home'));
        this.client_id = process.env[config.get("github.client.id")] || '';
        this.client_secret = process.env[config.get("github.client.secret")] || '';
        this.code = code || '';
    }
    public fetchTokenFromGithub() {
        return this.http.post(this.baseURL.concat(config.get('github.token_path')), 
            this.paramsSerialized({
                'client_id': this.client_id.toString(),
                'client_secret': this.client_secret.toString(),
                'code': this.code.toString()
            }))
            .then(this.handleResponse.bind(this))
            .catch(this.handleError.bind(this));
    }
    public fetchUserInfoWithToken(token: string) {
        return this.http.get(config.get('github.user_api_uri'),{
            headers: {
              Authorization: `Bearer ${token}`
            },
          })
          .then(this.handleResponse.bind(this))
          .catch(this.handleError.bind(this));
    }
}