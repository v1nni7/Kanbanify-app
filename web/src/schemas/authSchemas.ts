import z from 'zod'

export const signUpSchema = z.object({
  email: z.string().email({ message: 'Insira seu endereço de e-mail' }),
})

export type SignUpData = z.infer<typeof signUpSchema>

export const signInSchema = z.object({
  email: z.string().email({ message: 'Insira seu endereço de e-mail' }),
  password: z.string().nonempty({ message: 'Insira sua senha' }),
})

export type SigninData = z.infer<typeof signInSchema>

export const finishSignupSchema = z.object({
  name: z.string(),
  username: z.string(),
  password: z.string(),
})

export type FinishSignupSchema = z.infer<typeof finishSignupSchema>
