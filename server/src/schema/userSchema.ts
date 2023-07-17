import Joi from 'joi'

export const signUpSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
  // termsConditions: Joi.boolean().valid(true).required(),
})

export const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})
