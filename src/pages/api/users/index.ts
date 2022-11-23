import type { NextApiRequest, NextApiResponse } from 'next'
/**
 * @swagger
 * /api/users:
 *   get:
 *     description: get all user info of users signed up here by admin
 *     security: [{HttpOnlyCookie: []}]
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
 */