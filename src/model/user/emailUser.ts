import {EmailUser,Role, Token, User} from '../prismaModel';
import { MainUser } from './user';
import {ID} from './oauthUser';
const config = require('config');
import {PGConnect} from '../../utils';
const crypto = require('crypto');

type Count = Pick<User, 'name'|'email'>;
type CheckUpdate = {update: string};

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
            with new_email_user as (
                insert into auth.email_user ("email", "salt", "hash")
                values ($1,$2,$3)
                returning *
            ),
            new_user as (
                insert into auth.user ("name", "githubUserId", "photo", "email")
                select $4, $5, $6, "email" from new_email_user
                returning *
            )
            insert into auth.token ("role", "emailToken", "userId")
            select $7, $8, "id" from new_user
            returning *;
        `, [this.email, this.salt, this.hash, this.name, this.githubUserId, this.photo, [], null], false)
        .then(res => res as Token[]);
    }
    public readUser() {
        return this.db.connect<Count>(`
        SELECT
        CASE
          WHEN (SELECT COUNT(*) FROM auth.user WHERE name = $1) > 0 
          THEN (SELECT COUNT(*) FROM auth.user WHERE name = $1)
          ELSE 0
        END as name,
        CASE
          WHEN (SELECT COUNT(*) FROM auth.user WHERE email = $2) > 0 
          THEN (SELECT COUNT(*) FROM auth.user WHERE email = $2)
          ELSE 0
        END as email;
        `, [this.name, this.email])
        .then(res => res as Count[])
    }
    public checkUpdate() {
        return this.db.connect(`
        SELECT
        CASE
          WHEN (SELECT name FROM auth.user WHERE email = $2) = $1
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