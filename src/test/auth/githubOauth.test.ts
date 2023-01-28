import {getCodeFromGithub,
        getTokenFromGithub} from '../../service';
/**
 * unit test for getCodeFromGithub
 */
test('getCodeFromGithub returns code from query string', () => {
    const query = { code: 'abc123' };
    return expect(getCodeFromGithub(query)).resolves.toBe('abc123');
});

test('getCodeFromGithub throws error if code is invalid', () => {
    const query = {};
    return expect(getCodeFromGithub(query)).rejects.toEqual(new Error('code is invalid'));
});
/**
 * unit test for getTokenFromGithub
 */
jest.mock('../../utils/request/githubRequest', () => {
    return jest.fn().mockImplementation(() => {
        return {
            fetchTokenFromGithub: jest.fn(() => Promise.resolve({ status: 200, data: new Map([['access_token', 'abc123']]) }))
        };
    });
});
  
test('getTokenFromGithub returns token from GitHub API', async () => {
    const token = await getTokenFromGithub('abc123');
    expect(token).toBe('abc123');
});