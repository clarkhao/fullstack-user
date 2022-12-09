import type { NextApiRequest, NextApiResponse } from 'next'
import {sendEmailWithToken} from '../../../../service';
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
    const result = await sendEmailWithToken('clarktotoro@163.com', 13);
    if(result.res)
        res.status(200).send('ok');
    else
        res.status(400).send('bad')
}

export default ResendEmailHandler;