import type { NextApiRequest, NextApiResponse } from 'next'
import {sendEmailWithToken, validateToken} from '../../../../service';
import {Authorization} from '../../../../model';
import { db } from '../../../../utils';
/**
 * @swagger
 * /api/auth/email/resend:
 *   get:
 *     description: resend the signup email request
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: token
 *         schema: 
 *           type: string
 *     responses:
 *       200:
 *         description: verify the token successfully and resend the email
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/SimpleMessage'
 *       400: 
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/FailedAuth'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       409:
 *         $ref: '#/components/responses/ConflictId'
 *       500:
 *         $ref: '#/components/responses/ServerMistake'
 * 
 */

async function ResendEmailHandler (req: NextApiRequest, res: NextApiResponse) {
    const token = req.headers.token as string;
    console.log(`token: ${token}`);
    if(token === null || token === undefined) {
        res.status(401).json({message: 'invalid token'})
    } else {
        const result = await validateToken(token, 'EMAIL')
            .then(payload => payload as {id:number,iat:number,exp:number})
            .then(async payload => {
                const auth = new Authorization(payload.id, db);
                return {email: await auth.fromIdToEmail(), id: payload.id};
            })
            .then(query => {
                console.log(query.email)
                if(query.email.length > 0) {
                    return {email: query.email[0].email, id:query.id};
                }else {
                    return Promise.reject(`500 inner server mistake`);
                }
            })
            .then(email => {
                return sendEmailWithToken(email.email, email.id);
            })
            .catch((err: Error) => {
                console.log(`err: ${err}`);
                const status = parseInt(err.toString().split(' ')[0]);
                res.status(status).json({message: err});
            })
        if(result?.res)
            res.status(200).send('ok');
        
    }
}

export default ResendEmailHandler;