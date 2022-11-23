import type { NextApiRequest, NextApiResponse } from 'next'
/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     description: get user info details by id
 *     security: [{HttpOnlyCookie: []}]
 *     parameteres:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: integer
 *     responses:
 *       200:
 *         description: successfully get user information
 *   put:
 *     description: update the user info of own such as name, email or pwd
 *     security: [{HttpOnlyCookie: []}]
 *     parameteres:
 *       - in: cookie
 *         name: sessionId
 *         schema: 
 *           type: string
 *     requestBody:
 *       description: user information preparing for updating 
 *       content:
 *         application/x-www-form-urlencoded:
 *          schema:
 *            $ref: '#components/schemas/Encrypted'
 *     response:
 *       200:
 *         description: successfully updated the user info
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
 *   delete:
 *     description: cancel own account
 *     security: [{HttpOnlyCookie: []}]
 *     parameteres:
 *       - in: cookie
 *         name: sessionId
 *         schema: 
 *           type: string
 *     responses:
 *       200:
 *         description: successfully delete the account
 *         headers:
 *           Set-cookie:
 *             schema:
 *               type: string
 *       500:
 *         $ref: '#/components/responses/ServerMistake'
 */