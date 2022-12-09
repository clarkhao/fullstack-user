import type { NextApiRequest, NextApiResponse } from 'next';
import {signUpRepeatInfoCheck,
        decryptBody,
        saveUnloggedInfo,
        sendEmailWithToken} from '../../../service';

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     description: user sign up with name, email and pwd
 *     requestBody:
 *       description: user information post for signup 
 *       content:
 *         application/x-www-form-urlencoded:
 *          schema:
 *            $ref: '#components/schemas/Encrypted'
 *     responses:
 *       200:
 *         description: sign up successfully and afterwards send a email for confirmation
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
 */ 
async function SignUpHandler(req: NextApiRequest, res: NextApiResponse) {
    const mailerRes = await decryptBody(req.body.secret, req.body.sign, req.body.data)
        .then(async data => {
            console.log(`dataDecrypted: ${data}`);
            return {...{data}, check: await signUpRepeatInfoCheck(data)};
        })
        .then(async result => {
            console.log(`check: ${result.check}`);
            return {...result, query: await saveUnloggedInfo(result.data)};
        }).then(async result => {
            console.log(`query: ${result.query}`);
            const id = result.query;
            const pairs = JSON.parse(result.data);
            return sendEmailWithToken(pairs.email, id);
        })
        .catch((err:Error) => {
            console.log(err);
            const status = parseInt(err.toString().split(' ')[0]);
            res.status(status).json({message: err});
        });
    if(mailerRes?.res) {
        res.status(200).json({'email_token': mailerRes.token,'email': mailerRes.email, 'id': mailerRes.id});
    }
};

export default SignUpHandler;