/**
 * Model User
 * 
 */
export type User = {
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
export type GithubUser = {
    id: number
    githubId: number
    githubRepos: number
}
  
  /**
   * Model EmailUser
   */
export type EmailUser = {
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
export type Token = {
    id: number
    role: Role[]
    emailToken: string | null
    userId: number
}

export enum Role {
    Seller = 'Seller',
    Buyer ='Buyer',
    Admin ='Admin'
};