import jwt from 'jsonwebtoken'
import { hashSync, compareSync } from 'bcrypt'
import userRepository from '@/repositories/userRepository'
import { conflictError, unauthorizedError } from '@/errors/httpErrors'

type SignUpType = {
  email: string
  username: string
  password: string
}

const getUser = async (userId: string) => {
  const user = await userRepository.getUser(userId)

  if (!user) {
    throw unauthorizedError('Invalid credentials')
  }

  return user
}

async function signUp({ email, password, username }: SignUpType) {
  const isAvailableEmail = await userRepository.findByEmail(email)
  const isAvailableUsername = await userRepository.findByUsername(username)

  if (isAvailableEmail || isAvailableUsername) {
    throw conflictError('Email or username already in use')
  }

  const hashedPassword = hashSync(password, 10)

  await userRepository.createUser({
    email,
    username,
    password: hashedPassword,
  })
}

type SignInData = {
  email: string
  password: string
}

async function signIn({ email, password }: SignInData) {
  const user = await userRepository.findByEmail(email)

  if (!user) {
    throw unauthorizedError('Invalid credentials')
  }

  const isPasswordCorrect = compareSync(password, user.password)

  if (!isPasswordCorrect) {
    throw unauthorizedError('Invalid credentials')
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '14 days',
  })

  return { token, user }
}

export default { getUser, signUp, signIn }
