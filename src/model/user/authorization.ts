import { Token,Role, User } from "../prismaModel";
import jwt from 'jsonwebtoken';
const config = require('config');
import {PGConnect} from '../../utils';
require('dotenv').config();

enum TokenType {
    EMAIL = 'tokens.email_key',
    API = 'tokens.key'
}
type UserList = Omit<User & Token, 'emailToken' | 'userId'>
type Email = {email: string};

const findName = (value: string) => {
    return Object.keys(Role).find(key => Role[key as keyof typeof Role] === value) as Role;
}

class Authorization implements Token {
    id: number = 0;
    role: Array<Role> = [];
    emailToken: string | null = null;
    userId: number;
    db: PGConnect;
    //userId is the id of table user
    public constructor(id: number, db:PGConnect) {
        this.userId = id;
        this.db = db; 
    }
    //duration: i.e. '120s'
    public generateToken(duration: string, tokenType: keyof typeof TokenType) {
        this.emailToken = jwt.sign({id: this.userId}, 
            process.env[config.get(TokenType[tokenType])] || '', 
            { expiresIn: duration});
    }
    public async setRole(role: Role) {
        const roles = await this.read()
            .then(query => {
                return query[0].role.slice(1,-1).toString().split(',');
            });
        console.log(`roles: ${roles}, type: ${typeof roles}`)
        if(roles !== undefined) {
            if(roles.length > 0 && roles.includes(role.toString())) {
                return false;
            } else {
                const result = [...(roles.map(v => findName(v))), role];
                if([...roles].includes(''))
                    this.role = result.slice(1,);
                else 
                    this.role = result;
                return true;
            }
        }
    }
    public async updateRole(role: Role) {
        try {
            const check = await this.setRole(role);
            console.log(`check: ${check}`)
            if(!check) {
                return false
            } else {
                return this.db.connect(`
                    update auth.token
                    set "role"=$1
                    where "userId"=$2;
                `, [this.role, this.userId]) 
                .then( query => {
                    console.log(`query: ${query}`)
                    return query as boolean;
                });
            }
        } catch(err) {
            return Promise.reject(err);
        }
    }
    public read() {
        return this.db.connect(`
        select * from auth.token
        where "userId"=$1;
        `, [this.userId])
        .then(query => query as Token[])
        
    }
    public updateToken() {
        return this.db.connect(`
        update auth.token
        set "emailToken"=$1
        where "userId"=$2;
        `, [this.emailToken, this.userId])
        .then(query => query as boolean);
    }
    public readUserList(id?:number) {
        let text = '';
        let value: Array<number> = [];
        if(id) {
            text = `
            select u.id as id,u.name as name,u.photo as photo,u."githubUserId" as "githubUserId",u.email as email,t.role as role
            from auth.user as u, auth.token as t
            where u.id=t."userId" and u.id=$1;
            `;
            value = [id];
        } else {
            text = `
            select u.id as id,u.name as name,u.photo as photo,u."githubUserId" as "githubUserId",u.email as email,t.role as role
            from auth.user as u, auth.token as t
            where u.id=t."userId";
            `;
        }
        return this.db.connect(text,value)
        .then(query => query as UserList[]);
    }
    public deleteUser(ids: Array<number>) {
        console.log(ids);
        return this.db.connect(`
        with delete_token as (
            delete from auth.token as t
            where t."userId"=any($1)
            returning "userId" as id
        ),
        delete_user as (
            delete from auth.user as u
            using delete_token
            where u.id=any(
                select id from delete_token
            )
            returning u.email as email
        )
        delete from auth.email_user as e
        using delete_user
        where e.email=any(
            select email from delete_user
        );
        `,[ids])
        .then(query => query as boolean)
    }
    public fromIdToEmail() {
        return this.db.connect(`
        select u.email as email from auth.token as t, auth.user as u
        where t."userId"=$1 and t."userId"=u.id;
        `, [this.userId])
        .then(query => query as Email[]);
    }
}

export {Authorization,TokenType}
export type {UserList,Email};