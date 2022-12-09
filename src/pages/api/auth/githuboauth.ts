import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest } from 'next/server';
import {getCodeFromGithub,
        getTokenFromGithub, 
        getUserInfoWithToken} from '../../../service';

/**
 * @swagger
 * /api/auth/githuboauth:
 *   get:
 *     description: github oauth login
 *     paremeters:
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         description: The code sent by Github which will be used for token fetch
 *     responses:
 *       200:
 *         description: successfully login with the github oauth account
 *         headers:
 *           Set-cookie:
 *             schema:
 *               type: string
 *               example: sessionId=xxxxx; Max-Age=120000; Httponly; Secure; Samesite
 *       401:
 *         $ref: '#/components/responses/FailedAuth'
 *       500:
 *         $ref: '#/components/responses/ServerMistake'
 */
function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).send("OK");
};

export default handler;