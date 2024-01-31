import z from 'zod'

export const signUpSchema = z.object({
  email: z.string().email({ message: 'Insira um endereço e-mail' }),
})

export type SignUpData = z.infer<typeof signUpSchema>

export const signInSchema = z.object({
  password: z.string(),
  email: z.string().email({ message: 'Email must be a valid' }),
})
