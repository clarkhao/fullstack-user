import {GithubAPI} from '../../utils';
import { Github } from '../../model';

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
//get github token with async http request.
const getTokenFromGithub = (code: string) => {
    const githubAPI = new GithubAPI(code);
    return githubAPI.fetchTokenFromGithub().then(token => {
        console.log(token.status);
        if(token.status === 200)
            return Promise.resolve(token.data.get('access_token') as string);
        else
            return Promise.reject(new Error(`${token.data.get('error')}`));
    })
}
//get github user info with token
const getUserInfoWithToken = (token: string) => {
    const githubAPI = new GithubAPI();
    return githubAPI.fetchUserInfoWithToken(token).then(info => {
        const userInfo = new URLSearchParams(info.data);
        if(userInfo.get('login'))
            return Promise.resolve({
                id:0,
                name:userInfo.get('login') || '',
                photo: userInfo.get('avatar_url'),
                githubId: parseInt(userInfo.get('id') || ''), 
                githubRepos: parseInt(userInfo.get('public_repos') || '',
            )} as Github);
        else
            return Promise.reject(new Error('failed to fetch user info from github with token'));
    })
}

export { getCodeFromGithub,getTokenFromGithub,getUserInfoWithToken };