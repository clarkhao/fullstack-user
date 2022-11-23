/**
 * Model User
 * 
 */
type User = {
    id: number
    name: string
    photo: string | null
    githubUserId: number | null
    email: string | null
}
  /**
   * Model GithubUser
   * 
   */
type GithubUser = {
    id: number
    githubId: number
    githubRepos: number
}
  
  /**
   * Model EmailUser
   */
type EmailUser = {
    id: number
    email: string
    salt: string
    hash: string
    createAt: Date
    lastUpdateAt: Date
}
  /**
   * Model Token
   */
type Token = {
    id: number
    role: Role[]
    emailToken: string | null
    userId: number
}

enum Role {
    Seller = 'Seller',
    Buyer ='Buyer',
    Admin ='Admin'
};

export {User,GithubUser,EmailUser,Token,Role};