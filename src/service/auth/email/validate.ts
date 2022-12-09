import { TokenType } from '../../../model';
const config = require('config');
import jwt from 'jsonwebtoken';

const validateEmail = (token: string) => {
    try {
        const payload = jwt.verify(token, process.env[config.get(TokenType['EMAIL'])] || '');
        console.log(payload);
        return Promise.resolve(payload);
    } catch (err) {
        return Promise.reject(`401 ${err}`);
    }
    
}

export {validateEmail};