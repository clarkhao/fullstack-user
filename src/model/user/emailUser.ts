import {EmailUser,Role, Token, User} from '../prismaModel';
import { MainUser } from './user';
import {ID} from './oauthUser';
const config = require('config');
import {PGConnect} from '../../utils';
const crypto = require('crypto');

type Count = {'name': string, 'email': string};
type CheckUpdate = {'update': string};

class CustomUser extends MainUser<Token> implements EmailUser {
    email: string;
    salt: string;
    hash: string;
    createAt: Date = new Date();
    lastUpdateAt: Date = new Date();
    public constructor(db:PGConnect, name:string, hash?: string,email?:string) {
        super(db, name);
        this.email = email || '';
        this.salt = crypto.randomBytes(16).toString('hex');
        this.hash = crypto.pbkdf2Sync(hash, this.salt, 1000, 64, `sha512`).toString(`hex`);
    }
    public createUser() {
        return this.db.connect(`
            with new_user as (
                insert into auth.user ("name") 
                values ($1)
                returning *
            ),
            new_email_user as (
                insert into auth.email_user ("id", "email", "salt", "hash")
                select "id", $2,$3,$4 from new_user
                returning *
            )
            insert into auth.token ("role", "emailToken", "userId")
            select $5, $6, "id" from new_user
            returning *;
        `, [this.name, this.email, this.salt, this.hash, [], null], false)
        .then(res => res as Token[]);
    }
    /**
     * 分别检查是否有重复的name或者email
     * @returns [{name:1|0,email:1|0}]
     */
    public readUser() {
        return this.db.connect<Count>(`
        SELECT
        CASE
          WHEN (SELECT COUNT(*) FROM auth.user WHERE name = $1) > 0 
          THEN (SELECT COUNT(*) FROM auth.user WHERE name = $1)
          ELSE 0
        END as name,
        CASE
          WHEN (SELECT COUNT(*) FROM auth.email_user WHERE email = $2) > 0 
          THEN (SELECT COUNT(*) FROM auth.email_user WHERE email = $2)
          ELSE 0
        END as email;
        `, [this.name, this.email])
        .then(res => res as Count[])
    }
    public checkUpdate() {
        return this.db.connect(`
        SELECT
        CASE
          WHEN (SELECT name FROM auth.user as u,auth.email_user as e 
                WHERE e.email = $2 and e.id=u.id) = $1
          THEN 'photo'
          ELSE (SELECT
                CASE
                WHEN (SELECT COUNT(*) FROM auth.user WHERE name = $1) > 0 
                THEN 'name repeat'
                ELSE 'name repeat not'
          END)
        END as update;
        `, [this.name, this.email])
        .then(res => res as CheckUpdate[]);
    }
}

export {CustomUser};
export type {Count,CheckUpdate};