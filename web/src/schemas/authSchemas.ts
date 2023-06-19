import { object, ref, string } from 'yup'

export const signUpSchema = object({
  confirmPassword: string()
    .oneOf([ref('password'), 'Passwords must match'], 'Passwords must match')
    .required('Confirm you password'),
  password: string().required('Password is required'),
  email: string().email('Email must be a valid').required('Email is required'),
  username: string().required('Username is required'),
})

export const signInSchema = object({
  password: string().required('Password is required'),
  email: string().email('Email must be a valid').required('Email is required'),
})
