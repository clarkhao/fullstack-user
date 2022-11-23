import type { NextApiRequest, NextApiResponse } from 'next'
/**
 * @swagger
 * /api/auth/callback:
 *   get:
 *     description: varify the token from email callback and if OK, update the user role
 *     parameters:
 *       - in: query
 *         name: token
 *         schema: 
 *           type: string
 *     responses:
 *       200:
 *         description: verify the token successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/SimpleMessage'
 *       400: 
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       409:
 *         $ref: '#/components/responses/ConflictId'
 *       500:
 *         $ref: '#/components/responses/ServerMistake'
 * 
 */