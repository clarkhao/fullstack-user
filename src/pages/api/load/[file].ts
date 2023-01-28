import type { NextApiRequest, NextApiResponse } from 'next';
import {DetaAPI} from '../../../utils';
/**
 * @swagger
 * /api/load/{name}:
 *   get:
 *     description: get file by name
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: successfully get file
 *         content:
 *           image/jpeg:
 *             schema:
 *               type: string
 *               format: binary
 *       400: 
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerMistake'
 */

async function loadHandler (req: NextApiRequest, res: NextApiResponse) {
    try {
        const name = req.query.file as string;
        const detaAPI = new DetaAPI(name);
        detaAPI.createAxios();
        const blob = await detaAPI.readFile();
        const buffer = await blob.arrayBuffer();
        res.setHeader('content-type', 'image/jpeg');
        res.send(Buffer.from(buffer));
    } catch(err) {
        const error = new Error(`${err}`);
        const code = parseInt(error.message.split(' ').reverse()[0]) || 400;
        res.status(code).json({msg: error.message});
    }
}

export default loadHandler;