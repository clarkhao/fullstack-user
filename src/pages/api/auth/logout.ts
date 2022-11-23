import type { NextApiRequest, NextApiResponse } from 'next'
/**
 * @swagger
 * /api/auth/logout:
 *   get:
 *     description: log out
 *     security: [{HttpOnlyCookie: []}]
 *     parameteres:
 *       - in: cookie
 *         name: sessionId
 *         schema: 
 *           type: string
 *     responses:
 *       200:
 *         description: successfully log out
 *         headers:
 *           Set-cookie:
 *             schema:
 *               type: string
 *       401: 
 *         $ref: '#/components/responses/FailedAuth'
 *       500:
 *         $ref: '#/components/responses/ServerMistake'
 */ 