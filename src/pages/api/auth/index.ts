import type { NextApiRequest, NextApiResponse } from 'next';
import { Authorization } from '../../../model';
import { validateToken } from '../../../service';
import { db } from '../../../utils';

/**
 * @swagger
 * /api/auth:
 *   get:
 *     description: authentication with httponly cookie token
 *     security: 
 *       - HttpOnlyCookie: []
 *     parameteres:
 *       - in: cookie
 *         name: token
 *         schema: 
 *           type: string
 *     responses:
 *       200:
 *         description: confirm the login status
 *       401: 
 *         $ref: '#/components/responses/FailedAuth'
 *       500:
 *         $ref: '#/components/responses/ServerMistake'
 */ 
async function AuthenticationHandler (req: NextApiRequest, res: NextApiResponse) {
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
                    return true;
                } else {
                    return Promise.reject(`401 invalid token`);
                }
            })
            .catch((err: Error) => {
                console.log(`err: ${err}`);
                const status = parseInt(err.toString().split(' ')[0]);
                res.status(status).json({message: err});
            })
        res.status(200).json({message: 'ok'});
    }
}

export default AuthenticationHandler;