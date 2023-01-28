import {User,GithubUser} from '../prismaModel';
import { MainUser } from './user';
import {PGConnect} from '../../utils';

interface OauthUserType<T> {
    createUser(): Promise<T[]>,
    readUser(): Promise<boolean>
}
type Github = Omit<User & GithubUser, ''>;
type ID = {id: number};

class OauthUser extends MainUser<User> implements GithubUser {
    id: number = 0;
    githubId: number;
    //db is the depencency injection
    public constructor(db:PGConnect,name?:string,id?:number) {
        super(db, 'github_'+ name)
        this.githubId = id || 0;
    }
    /**
     * 先执行user存储，再执行github_user存储
     * @returns 
     */
    public async createUser() {
        return this.db.connect<User>(`
            with new_user as (
                insert into auth.user ("name") 
                values ($1)
                on conflict ("name") 
                do update set "name"=$3
                returning *
            )
            insert into auth.github_user ("id", "githubId")
            select "id", $2 from new_user
            returning *;`,
        [this.name, this.githubId, this.name.concat(`_${Math.round(Math.random()*100000)}`)],false)
        .then(res => {
            return res as User[];
        });
    }
    /**
     * read the user by githubId
     * @returns true if exists or else return false
     */
    public readUser() {
        return this.db.connect(`
            select * 
            from auth.github_user as g
            where "g.githubId"=$1;
        `, [this.githubId])
        .then(res => res as boolean);
    }
}

export type {OauthUserType,Github,ID};
export {OauthUser};