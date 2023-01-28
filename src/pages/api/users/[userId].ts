import type { NextApiRequest, NextApiResponse } from 'next'
import { Authorization, CustomUser } from '../../../model';
import { validateToken,decryptBody } from '../../../service';
import {db} from '../../../utils';
import { setCookie } from 'cookies-next';

/**
 * @swagger
 * /api/users/{userId}:
 *   get:
 *     description: get user info details by id
 *     security: 
 *       - HttpOnlyCookie: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema: 
 *           type: number
 *     responses:
 *       200:
 *         description: successfully get user information
 *       401: 
 *         $ref: '#/components/responses/FailedAuth'
 *   put:
 *     description: update the user info of own such as name, email or pwd
 *     security: 
 *       - HttpOnlyCookie: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema: 
 *           type: number
 *     requestBody:
 *       description: user information preparing for updating 
 *       content:
 *         application/x-www-form-urlencoded:
 *          schema:
 *            $ref: '#components/schemas/Encrypted'
 *     responses:
 *       200:
 *         description: successfully updated the user info
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
 *   delete:
 *     description: cancel own account
 *     security: [{HttpOnlyCookie: []}]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema: 
 *           type: number
 *     responses:
 *       200:
 *         description: successfully delete the account
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

async function ReadUserDetailByIdHandler (req: NextApiRequest, res: NextApiResponse) {
    const cookies = req.cookies;
    const { userId } = req.query;
    console.log(userId)
    if(!cookies.token) {
        res.status(401).json({message: 'invalid token'})
    } else {
        const result = await validateToken(cookies.token, 'API')
            .then(payload => payload as {id:number,iat:number,exp:number})
            .then(async payload => {
                if(payload.id === parseInt(userId as string)) {
                    const auth = new Authorization(payload.id, db);
                    const query = await auth.read();
                    if(query[0].emailToken === cookies.token)
                        return {check: true, auth};
                    else
                        return Promise.reject(`401 invalid token`);
                } else {
                    return Promise.reject(`401 invalid token`);
                }
            })
            .catch((err: Error) => {
                console.log(`err: ${err}`);
                const status = parseInt(err.toString().split(' ')[0]);
                res.status(status).json({message: err});
            })
        if(result && result.check) {
            switch (req.method) {
                case 'GET':
                    return result.auth.readUserList(parseInt(userId as string))
                    .then(query => res.status(200).json(query))
                    .catch( err =>{
                        res.status(500).json({message: 'server mistake'});
                    })
                case 'PUT':
                    return decryptBody(req.body.secret, req.body.sign, req.body.data)
                    .then(async data => {
                        const pairs: {name:string,email:string,photo:string} = JSON.parse(data);
                        console.log(pairs);
                        const user = new CustomUser(db, pairs.name, pairs.email);
                        user.id = parseInt(userId as string);
                        const check = await user.checkUpdate();
                        if(check[0].update.endsWith('repeat')) {
                            return Promise.reject(`409 Already used name`);
                        } else {
                            return user.updateUser();
                        }
                    })
                    .then(query => {
                        if(query)
                            res.status(200).json({message: 'ok'});
                        else
                            return Promise.reject(`500 inner server mistake`);
                    })
                    .catch((err: Error) => {
                        console.log(`err: ${err}`);
                        const status = parseInt(err.toString().split(' ')[0]);
                        res.status(status).json({message: err});
                    })
                case 'DELETE':
                    return result.auth.deleteUser([parseInt(userId as string)])
                    .then(query => {
                        setCookie('token', '', { req,res, expires: new Date(Date.now() + 1000), httpOnly: true, secure: true, sameSite: true });
                        res.status(200).json(query)
                    })
                    .catch( err =>{
                        console.log(err);
                        res.status(500).json({message: 'server mistake'});
                    })
            }
        } 
            
    }
}

export default ReadUserDetailByIdHandler;