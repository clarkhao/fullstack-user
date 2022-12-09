import {Authorization, CustomUser} from '../../model';
import {db} from '../../utils';
import { SignUp } from './repeatCheck';
const crypto = require('crypto');

type SaltType = {
    id: number,
    salt: string,
    hash: string
}

const getHashAndSaltFromDB = (data:string) => {
    //获取name: pairs.name, password: pairs.password, email: pairs.email
    const pairs: SignUp = JSON.parse(data);
    let text = '';
    let value: Array<string> = [];
    if(typeof pairs.name === 'string') {
        text = `
        with new_user as (
            select * from auth.user
            where name=$1
        )
        select u.id as id, e.salt as salt, e.hash as hash from auth.email_user as e, new_user as u
        where e.email=u.email; 
        `;
        value = [pairs.name];
    } else {
        text = `
        with new_user as (
            select * from auth.user
            where email=$1
        )
        select u.id as id, e.salt as salt, e.hash as hash from auth.email_user as e, new_user as u
        where e.email=$1;
        `;
        value = [pairs.email];
    }
    return db.connect<SaltType>(text, value, false)
        .then(query => query as SaltType[])
        .then(query => {
            if(query.length === 0) {
                return Promise.reject(`404 not found user or email`)
            }
            console.log(query[0])
            return {loginData: pairs, dbData: query[0]}
        })
}

const verifyHash = (data: {loginData:SignUp, dbData: SaltType}) => {
    const hash = crypto.pbkdf2Sync(data.loginData.password, data.dbData.salt, 1000, 64, 'sha512').toString('hex');
    // Compare the entered hash to the stored password
    if (hash === data.dbData.hash) {
      // The entered password is correct
      console.log('Password is correct');
      return Promise.resolve({verify: true, id: data.dbData.id});
    } else {
      // The entered password is incorrect
      console.log('Password is incorrect');
      return Promise.reject(`403 invalid password`);
    }
}

const checkRoleAndSendToken = (data: {verify: boolean, id: number}) => {
    if(data.verify) {
        const auth = new Authorization(data.id, db);
        return auth.readRole()
            .then(query => {
                console.log(query);
                if(query[0] !== '') {
                    return {check: query, token: auth.generateToken('120s','API')}
                } else {
                    return Promise.reject(`401 not completed signup`);
                }
            })
    } else {
        return Promise.reject(`403 invalid password`);
    }
}

export {getHashAndSaltFromDB,verifyHash,checkRoleAndSendToken};