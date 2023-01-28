import { Prisma } from "@prisma/client"

/**
 * Model User
 * 
 */
 export type User = {
    id: number
    name: string
}

/**
 * Model GithubUser
 * 
 */
export type GithubUser = {
  id: number
  githubId: number
}
  
/**
 * Model EmailUser
 * 
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
 * Model Profile
 * 
 */
export type Profile = {
  id: number
  photo: string | null
  selfIntro: string
}

/**
 * Model Token
 * 
 */
export type Token = {
  id: number
  role: Role[]
  emailToken: string | null
  userId: number
}

/**
 * Model Pet
 * 
 */
export type Pet = {
  id: number
  name: string
  age: number
  photo: string | null
  ownerId: number
}

/**
 * Model petOnPost
 * 
 */
export type petOnPost = {
  petId: number
  postId: number
}

/**
 * Model Post
 * 
 */
export type Post = {
  id: number
  title: string
  photo: string[]
  content: Prisma.JsonValue
  published: boolean
  authorId: number
  type: PostType
  views: number
  likes: number
  wishes: number
  createAt: Date
  lastUpdateAt: Date
}

/**
 * Model TPost
 * 
 */
export type TPost = {
  postId: number
  price: number
  from: Date
  to: Date
}

/**
 * Model SPost
 * 
 */
export type SPost = {
  postId: number
}

/**
 * Model Comment
 * 
 */
export type Comment = {
  id: number
  content: string
  postId: number
  userId: number
  replies: Prisma.JsonValue | null
  createAt: Date
}

/**
 * Model Social
 * 
 */
export type Social = {
  id: number
  userId: number
  postId: number
  type: SocialType
  createAt: Date
}


/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export enum PostType {
  trade = 'trade',
  social = 'social'
};

//export type PostType = (typeof PostType)[keyof typeof PostType]


export enum Role {
  Seller = 'Seller',
  Buyer = 'Buyer',
  Admin = 'Admin'
};

//export type Role = (typeof Role)[keyof typeof Role]


export enum SocialType {
  like = 'like',
  wish = 'wish'
};
  
//export type SocialType = (typeof SocialType)[keyof typeof SocialType]