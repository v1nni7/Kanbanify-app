import { api } from './api'

type SignInRequestData = {
  email: string
  password: string
}

type SignUpRequestData = {
  username: string
  email: string
  password: string
  confirmPassword: string
}

export const signInRequest = async (inputData: SignInRequestData) => {
  const { data } = await api.post('/user/sign-in', inputData)
  return data
}

export const signUpRequest = async (inputData: SignUpRequestData) => {
  const response = await api.post('/user/sign-up', inputData)
  return response
}

export const getUserRequest = async () => {
  const { data } = await api.get('/user')
  return data
}
