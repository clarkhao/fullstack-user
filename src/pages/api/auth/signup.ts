import type { NextApiRequest, NextApiResponse } from 'next'
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
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       409:
 *         $ref: '#/components/responses/ConflictId'
 *       500:
 *         $ref: '#/components/responses/ServerMistake'
 */ 