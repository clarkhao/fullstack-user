import type { NextApiRequest, NextApiResponse } from 'next'
const config = require('config');
import {Authorization, TokenType} from '../../../model';
import {validateToken} from '../../../service';
import { db } from '../../../utils';
import { setCookie } from 'cookies-next';

/**
 * @swagger
 * /api/auth/logout:
 *   get:
 *     description: log out
 *     security: 
 *       - HttpOnlyCookie: []
 *     parameteres:
 *       - in: cookie
 *         name: token
 *         schema: 
 *           type: string
 *     responses:
 *       200:
 *         description: successfully log out
 *         headers:
 *           Set-cookie:
 *             schema:
 *               type: string
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/SimpleMessage'
 *       401: 
 *         $ref: '#/components/responses/FailedAuth'
 *       500:
 *         $ref: '#/components/responses/ServerMistake'
 */ 

async function LogoutHandler (req: NextApiRequest, res: NextApiResponse) {
    const cookies = req.cookies;
    if(!cookies.token) {
        res.status(401).json({message: 'invalid token'})
    } else {
        const result = await validateToken(cookies.token, 'API')
            .then(payload => payload as {id:number,iat:number,exp:number})
            .then(async payload => {
                const auth = new Authorization(payload.id, db);
                const query = await auth.read();
                if(query[0].emailToken === cookies.token) {
                    auth.emailToken = null;
                    setCookie('token', '', { req,res, expires: new Date(Date.now() + 1000), httpOnly: true, secure: true, sameSite: true });
                    return auth.updateToken();
                } else {
                    return Promise.reject(`401 invalid token`);
                }
            })
            .catch((err: Error) => {
                console.log(`err: ${err}`);
                const status = parseInt(err.toString().split(' ')[0]);
                res.status(status).json({message: err});
            })
        if(result)
            res.status(200).json({message: 'ok'});            
    }
}

export default LogoutHandler;