import {User,GithubUser} from '../prismaModel';
import { MainUser } from './user';
const config = require('config');
import {PGConnect} from '../../utils';

interface OauthUserType<T,U> {
    createUser(): Promise<T[]|boolean>,
    readAllUsers(): Promise<U[]>
}
type Github = Omit<User & GithubUser, 'githubUserId' | 'email'>;
type ID = {id: number};

class OauthUser extends MainUser<ID> implements GithubUser {
    id: number = 0;
    githubId: number;
    githubRepos: number;
    private users: Github[] = [];
    //db is the depencency injection
    public constructor(db:PGConnect,name?:string,id?:number,num?:number) {
        super(db, 'github_'+ name)
        this.githubId = id || 0;
        this.githubRepos = num || 0;
    }
    public createUser() {
        return this.db.connect<ID>(`
            with new_user as (
                insert into auth.github_user ("githubId","githubRepos") 
                values ($1,$2)
                on conflict ("githubId") 
                do update set "githubRepos"=$2
                returning *
            )
            insert into auth.user ("name", "githubUserId", "email")
            select $3, "githubId", $4 from new_user
            on conflict ("githubUserId")
            do update set name=$3
            returning id;`,
        [this.githubId, this.githubRepos, this.name, this.email],false)
        .then(res => {
            return res as ID[];
        });
    }
    public readAllUsers() {
        return this.db.connect<Github>(`
            select *
            from auth.github_user as g, auth.user as u
            where "g.githubId"="u.githubUserId";
        `)
        .then(res => {
            return res as Github[];
        })
        .then(info => {
            info.forEach(value => {
                this.users.push({
                    id: value['id'],
                    name: value['name'],
                    photo: value['photo'],
                    githubId: value['githubId'],
                    githubRepos: value['githubRepos']
                });
            })
            return this.users;
        });
    }
}

export type {OauthUserType,Github,ID};
export {OauthUser};