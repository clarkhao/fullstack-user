import type { NextApiRequest, NextApiResponse } from 'next'
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     description: log in with user info
 *     requestBody:
 *       description: user information post for signup 
 *       content:
 *         application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              secret: 
 *                type: string
 *              sign:
 *                type: string
 *              data:
 *                type: string
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
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerMistake'
 */