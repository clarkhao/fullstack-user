import { Token,Role } from "../prismaModel";
import jwt from 'jsonwebtoken';
const config = require('config');
import {PGConnect} from '../../utils';
require('dotenv').config();

enum TokenType {
    EMAIL = 'tokens.email_key',
    API = 'tokens.key'
}

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
        return jwt.sign({id: this.userId}, 
            process.env[config.get(TokenType[tokenType])] || '', 
            { expiresIn: duration});
    }
    public async setRole(role: Role) {
        const roles = await this.readRole();
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
    public readRole() {
        return this.db.connect(`
        select * from auth.token
        where "userId"=$1;
        `, [this.userId], false)
        .then(query => query as Token[])
        .then(query => {
            return query[0].role.slice(1,-1).toString().split(',');
        })
    }
}

export {Authorization,TokenType}