import type { NextApiRequest, NextApiResponse } from 'next'
import {validateEmail, updateRoleInDB} from '../../../../service';
import {TokenExpiredError} from 'jsonwebtoken';
import { setCookie } from 'cookies-next';

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
        return validateEmail(req.query['code'] as string)
            .then(payload => payload as Payload)
            .then(payload => {
                const {id, ...other} = payload;
                console.log(`id: ${id}`)
                return id;
            }).then(id => {
                return updateRoleInDB(id);
            }).then(result => {
                if(result.check){
                    setCookie('token', result.token, { expires: new Date(Date.now() + 120000), httpOnly: true, secure: true, sameSite: true });
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