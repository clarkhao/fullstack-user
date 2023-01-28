import {User} from '../prismaModel';
import {PGConnect} from '../../utils';
import { ID } from './oauthUser';

class MainUser<T> implements User {
    id: number = 0;
    name: string;
    db: PGConnect;
    public constructor(db:PGConnect, name: string) {
        this.db = db;
        this.name = name;
    }
    /**
     * 创建新user，导入name
     * @returns id
     */
    public createUser() {
        return this.db.connect(`
            insert into auth.user ('name')
            values ($1)
            returning id;
        `,[this.name], false)
        .then(res => res as ID[])
    }
    /**
     * 升级user的名字name
     * @returns 成功后返回true
     */
    public updateUser() {
        return this.db.connect(`
            update auth.user
            set name=$1
            where id=$3;
        `,[this.name, this.id])
        .then(res => {
            return res as boolean;
        });
    }
}

export {MainUser};