import {CustomUser} from '../../model';
import {db} from '../../utils';
import { SignUp } from './repeatCheck';

const saveUnloggedInfo = (data: string) => {
    const pairs: SignUp = JSON.parse(data);
    const user = new CustomUser(db, pairs.name, pairs.password, pairs.email);
    return user.createUser()
                .then(query => {
                    if(typeof query !== 'boolean' && query?.length > 0) {
                        console.log(query[0])
                        return Promise.resolve(query[0].userId);
                    }
                    else {
                        return Promise.reject(new Error('500 failed to write into db with email user info'));
                    }
                });
}

export {saveUnloggedInfo};