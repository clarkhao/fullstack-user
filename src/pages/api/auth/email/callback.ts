import type { NextApiRequest, NextApiResponse } from 'next'
import {validateToken, updateRoleInDB} from '../../../../service';
import { setCookie } from 'cookies-next';
import {Authorization} from '../../../../model';
import {db} from '../../../../utils';

type Payload = {
    id: number,
    iat: number,
    exp: number
}
/**
 * @swagger
 * /api/auth/email/callback:
 *   get:
 *     description: varify the token from email callback and if OK, update the user role
 *     parameters:
 *       - in: query
 *         name: token
 *         schema: 
 *           type: string
 *     responses:
 *       200:
 *         description: verify the token successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/SimpleMessage'
 *       400: 
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       409:
 *         $ref: '#/components/responses/ConflictId'
 *       500:
 *         $ref: '#/components/responses/ServerMistake'
 * 
 */

async function ValidateEmailHandler (req: NextApiRequest, res: NextApiResponse) {
        console.log(`token: ${req.query['code']}`);
        return validateToken(req.query['code'] as string, 'EMAIL')
            .then(payload => payload as Payload)
            .then(payload => {
                const {id, ...other} = payload;
                console.log(`id: ${id}`)
                return id;
            })
            .then(id => {
                const auth = new Authorization(id, db);
                return auth.read()
                .then(query => {
                    return {check: query.length > 0, id}
                });
            })
            .then(query => {
                if(query.check)
                    return updateRoleInDB(query.id);
                else
                    return Promise.reject(`400 invalid user`);
            }).then(result => {
                if(result.check){
                    setCookie('token', result.token, { expires: new Date(Date.now() + 259200000), httpOnly: true, secure: true, sameSite: true });
                    res.status(200).json({message: 'ok'});
                } else {
                    res.status(301).json({message: 'signup completed'});
                }
            })
            .catch((err:Error) => {
                console.log(err);
                const status = parseInt(err.toString().split(' ')[0]);
                res.status(status).json({message: err});
            })
}

export default ValidateEmailHandler;