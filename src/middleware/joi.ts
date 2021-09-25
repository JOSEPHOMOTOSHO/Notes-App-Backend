import joi from "joi"
import jwt from 'jsonwebtoken';
const emailValidator = require('deep-email-validator');

interface obj{
  firstName:string,
  lastName:string,
  email:string,
  password:string
}

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

const secret: string = process.env.ACCESS_TOKEN_SECRET as string;
const hrs: string =process.env.ACCESS_EXPIRES as string;
export const signToken = async (args:obj) => {
  return jwt.sign({ args }, secret, {
    expiresIn: hrs,
  });
};

export async function isEmailValid(email: string) {
  return emailValidator.validate(email);
}
