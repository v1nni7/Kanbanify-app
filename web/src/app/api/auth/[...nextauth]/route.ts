import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { api } from '@/services/api'

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as any

        const response = await api.post('/user/sign-in', { email, password })

        const user = response.data

        if (response.status === 200 && user) {
          return user
        }

        return null
      },
    }),
  ],

  session: {
    strategy: 'jwt',
  },

  pages: {
    signIn: '/signin',
  },

  callbacks: {
    async jwt({ token, user }: any) {
      return { ...token, ...user }
    },

    async session({ session, token, user }: any) {
      session.user = token

      return session
    },
  },
}

// @ts-ignore
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
