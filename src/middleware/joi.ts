import { Response, Request, NextFunction } from "express"
import joi from "joi"
import jwt from 'jsonwebtoken';
import { objJoi } from "../interfaces/interface";


export async function joiValidateSignup(req:Request, res:Response, next:NextFunction){
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
  const { error }= await todoSignupSchema.validate(req.body);
  if (error) {
    res.status(404).send(error.details[0].message);
    return;
  }
  next()
}

const secret: string = process.env.ACCESS_TOKEN_SECRET as string;
const min: string =process.env.ACCESS_EXPIRES as string;
export const signToken = async (args:objJoi) => {
  return jwt.sign({ args }, secret, {
    expiresIn: min,
  });
};




