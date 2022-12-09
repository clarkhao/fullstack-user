import {db, Mailer} from '../../utils';
import Mail from 'nodemailer/lib/mailer';
import { Authorization } from '../../model';
const config = require('config');

const sendEmailWithToken = async (email: string, id:number) => {
    const token = (new Authorization(id,db)).generateToken('12000s','EMAIL');
    const mailer = new Mailer();
    const url = process.env[config.get('server.host')]?.concat(`:${process.env[config.get('server.port')]}`)
        .concat(`/api/auth/email/callback?code=${token}`);
    return mailer.sendMail(email, `注册确认`, 
    `<div>
    please click the following url for completing the signup
    <a href="${url}">${url}</a>
    </div>`)
    .then(info => {
        const status = parseInt(info.response.split(' ')[0]);
        console.log(`status: ${status}`);
        if(status >= 200 && status < 300)
            return Promise.resolve({token, res: true, email, id});
        else
            return Promise.reject('404 failed to send email.');
    }); 
}

export {sendEmailWithToken};