import {Cryption} from '../../utils';

const decryptBody = (secret:string, sign:string, data:string) => {
    const cryption = new Cryption(secret, sign, data);
    try {
        if(cryption.isSecret() && cryption.isSignValidated()) {
            console.log('signature passed');
            return Promise.resolve(cryption.decrypted);
        } else {
            return Promise.reject('401 signature broken');
        }
    } catch(err) {
        console.log(err);
        return Promise.reject('500 internal server mistake');
    }
}

export {decryptBody};