import { TokenType } from '../../../model';
const config = require('config');
import jwt from 'jsonwebtoken';

const validateToken = (token: string, tokenType: keyof typeof TokenType) => {
    try {
        const payload = jwt.verify(token, process.env[config.get(TokenType[tokenType])] || '');
        console.log(payload);
        return Promise.resolve(payload);
    } catch (err) {
        return Promise.reject(`401 ${err}`);
    }
    
}

export {validateToken};