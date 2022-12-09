import { Authorization, TokenType } from "../../../model";
import {db} from '../../../utils';
import { Role } from "../../../model/prismaModel";
const config = require('config');

const updateRoleInDB = (id: number) => {
    const auth = new Authorization(id, db);
    return auth.updateRole(Role.Buyer)
        .then(result => {
            return {check: result, token: auth.generateToken('120s','API')}
        })
        .catch(err => {
            return Promise.reject(`500 ${err}`);
        })
}

export {updateRoleInDB};