import type { NextApiRequest, NextApiResponse } from 'next'
/**
 * @swagger
 * /api/auth/githuboauth:
 *   get:
 *     description: github oauth login
 *     responses:
 *       200:
 *         description: successfully login with the github oauth account
 *       400:
 *         description: failed to log in 
 *         content:
 *           application/json:
 *             type: Object
 *             properties:
 *               message:
 *                 type: string
 */