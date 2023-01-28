import { setCookie } from 'cookies-next';
import type { NextApiRequest, NextApiResponse } from 'next'
import { Authorization } from '../../../model';
import {decryptBody, getHashAndSaltFromDB, verifyHash, checkRoleAndSendToken} from '../../../service';
import { db } from '../../../utils';
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     description: log in with user info
 *     requestBody:
 *       description: user information post for signup 
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               secret: 
 *                 type: string
 *               sign:
 *                 type: string
 *               data:
 *                 type: string
 *     responses:
 *       200:
 *         description: successfully login with email and password
 *         headers:
 *           Set-cookie:
 *             schema:
 *               type: string
 *               example: sessionId=xxxxx; Max-Age=120000; Httponly; Secure; Samesite
 *       400: 
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/FailedAuth'
 *       403:
 *         $ref: '#/components/responses/InvalidPWD'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerMistake'
 */

async function LoginHandler (req: NextApiRequest, res: NextApiResponse) {
    let id = 0;
    const result = await decryptBody(req.body.secret, req.body.sign, req.body.data)
        .then(async data => {
            console.log(`dataDecrypted: ${data}`);
            return getHashAndSaltFromDB(data);
        })
        .then(query => {
            return verifyHash(query);
        })
        .then(verify => {
            id = verify.id;
            return checkRoleAndSendToken(verify)
                .then(query => {
                    if(query.check) {
                        setCookie('token', query.token, { req,res, expires: new Date(Date.now() + 259200000), httpOnly: true, secure: true, sameSite: true });
                        return true;
                    } else {
                        return false;
                    }
                })
        })
        .catch((err: Error) => {
            console.log(`err: ${err}`);
            const status = parseInt(err.toString().split(' ')[0]);
            if(status === 401) {
                const auth = new Authorization(id,db);
                const token = auth.generateToken('12000s','EMAIL');
                console.log(id);
                console.log(auth.emailToken);
                res.status(301).json({'email_token': auth.emailToken, 'id': id});
            } else {
                res.status(status).json({message: err});
            }
        })
        if(result)
            res.status(200).json({message: 'ok',id});
}

export default LoginHandler;