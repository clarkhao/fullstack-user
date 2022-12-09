import {EmailUser,Role} from '../prismaModel';
import { MainUser } from './user';
import {ID} from './oauthUser';
const config = require('config');
import {PGConnect} from '../../utils';
const crypto = require('crypto');

type Count = {count: string};

class CustomUser extends MainUser<ID> implements EmailUser {
    email: string;
    salt: string;
    hash: string;
    createAt: Date = new Date();
    lastUpdateAt: Date = new Date();
    public constructor(db:PGConnect, name:string, hash: string,email?:string, ) {
        super(db, name);
        this.email = email || '';
        this.salt = crypto.randomBytes(16).toString('hex');; 
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
        .then(res => res as ID[]);
    }
    public readUser() {
        return this.db.connect<Count>(`
            select count(*)
            from auth.user as u
            where u.name=$1 or u.email=$2;
        `, [this.name, this.email])
        .then(res => res as Count[])
        .then(row => parseInt(row[0].count) === 0);
    }
}

export {CustomUser};