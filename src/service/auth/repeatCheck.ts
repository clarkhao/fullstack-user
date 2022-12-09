import {db} from '../../utils';
import {CustomUser} from '../../model';

export type SignUp = {
    name: string,
    email: string,
    password: string
}

const signUpRepeatInfoCheck = (data: string) => {
    const pairs:SignUp = JSON.parse(data);
    const user = new CustomUser(db, pairs.name, pairs.password, pairs.email);
    return user.readUser().then(res => {
        if(!res)
            return Promise.reject('409 Already used name or email');
        else
            return res as boolean;
    })
}

export {signUpRepeatInfoCheck};