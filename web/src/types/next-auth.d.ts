// eslint-disable-next-line
import NextAuth from 'next-auth'

declare module 'next-auth' {
  export interface Session {
    user: {
      token: string
      email: string
      username: string
      photo: string
    }
  }
}
