import { Pool } from "pg";
const config = require('config');

type Credentials = {
    user: string,
    host: string,
    database: string,
    password: string,
    port: number
}
class PGConnect {
    private credentials: Credentials;
    private pool: Pool
    public constructor(db: string) {
        this.credentials = {
            user: process.env[config.get('db.user')] || '',
            host: process.env[config.get('db.host')] || '',
            database: db,
            password: process.env[config.get('db.pwd')] || '',
            port: config.get('db.port')
        }
        this.pool = new Pool(this.credentials);
    }
/**text+values用于sql操作，option=true, 函数返回boolean,
 * option=false时，insert和update最后使用returning语句, 函数返回T[]
 */
    public connect<T>(text: string, values?: unknown[], option: boolean=true) {
        return this.pool.connect().then(client => {
            return client.query(text, values).then(res => {
                client.release();
                if((res.command === 'INSERT' || res.command === 'UPDATE') && option) {
                    if(res.rowCount > 0)
                        return true;
                    else 
                        return false;
                } else {
                    return res.rows as T[];
                } 
            }).catch(err => {
                client.release();
                throw new Error(err.stack);
            })
        })
    }
}
const db = new PGConnect(process.env[config.get('db.name')] || '');
export {db, PGConnect};