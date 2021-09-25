import joi from "joi"
const emailValidator = require('deep-email-validator');

export async function joiValidateSignup(validate:String){
  const todoSignupSchema = joi
   .object({
       firstName: joi.string().trim().min(3).max(250).required(),
       lastName: joi.string().trim().min(3).max(250).required(),
       password: joi.string().min(7).required().alphanum(),
       confirm_password: joi.ref('password'),
       email: joi
         .string()
         .trim()
         .lowercase()
   })
  .with('password', 'confirm_password');
  const validated = await todoSignupSchema.validate(validate);
  return validated
}

export async function isEmailValid(email: string) {
  return emailValidator.validate(email);
}
