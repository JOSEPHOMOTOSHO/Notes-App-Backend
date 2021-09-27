import joi from "joi"
import jwt from 'jsonwebtoken';
import { objJoi } from "../interfaces/interface";
const emailValidator = require('deep-email-validator');


export async function joiValidateSignup(validate:String){
  const todoSignupSchema = joi
   .object({
       firstName: joi.string().trim().min(3).max(250).required(),
       lastName: joi.string().trim().min(3).max(250).required(),
       password: joi.string().min(7).required().alphanum(),
       confirm_password: joi.string().min(7).required().alphanum(),
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
export const signToken = async (args:objJoi) => {
  return jwt.sign({ args }, secret, {
    expiresIn: hrs,
  });
};

export async function isEmailValid(email: string) {
  return emailValidator.validate(email);
}



