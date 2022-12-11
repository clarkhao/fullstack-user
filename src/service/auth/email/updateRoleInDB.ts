import { Authorization, TokenType } from "../../../model";
import {db} from '../../../utils';
import { Role } from "../../../model/prismaModel";
const config = require('config');

const updateRoleInDB = (id: number) => {
    const auth = new Authorization(id, db);
    return auth.updateRole(Role.Buyer)
        .then(async result => {
            auth.generateToken('3d','API');
            const query = await auth.updateToken();
            return {check: result && query, token: auth.emailToken}
        })
        .catch(err => {
            return Promise.reject(`500 ${err}`);
        })
}

export {updateRoleInDB};