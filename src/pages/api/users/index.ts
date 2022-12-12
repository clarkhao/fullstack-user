import type { NextApiRequest, NextApiResponse } from 'next'
import { Authorization } from '../../../model';
import { validateToken } from '../../../service';
import {db} from '../../../utils';

/**
 * @swagger
 * /api/users:
 *   get:
 *     description: get all user info of users signed up here by admin
 *     security: 
 *       - HttpOnlyCookie: []
 *     responses:
 *       200:
 *         description: successfully get user list
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/User'
 *       401: 
 *         $ref: '#/components/responses/FailedAuth'
 *       500:
 *         $ref: '#/components/responses/ServerMistake'
 *   delete:
 *     description: delete a list of users by admin
 *     security: 
 *       - HttpOnlyCookie: []
 */

async function ReadUserListHandler (req: NextApiRequest, res: NextApiResponse) {
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
                    return {check: true, auth};
                } else {
                    return Promise.reject(`401 invalid token`);
                }
            })
            .then(check => {    
                return check.auth.readUserList();
            })
            .catch((err: Error) => {
                console.log(`err: ${err}`);
                const status = parseInt(err.toString().split(' ')[0]);
                res.status(status).json({message: err});
            })
        if(result && result.length > 0)
            res.status(200).json(result);
    }
}

export default ReadUserListHandler;