//get code from github after customer logged in github with oauth
const getCodeFromGithub = (query: Record<string,string>) => {
    const params = new URLSearchParams(query);
    //maybe return null
    return new Promise<string>((resolve,reject) => {
        if(params.get('code'))
            return resolve(params.get('code') as string);
        else
            return reject(new Error('code is invalid'));
    })
}

export {getCodeFromGithub};