import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { obj } from '../interfaces/interface';
import { joiValidateSignup, signToken } from '../middleware/joi';
import notesUsers from '../model/signupModel';
import sendEmail from '../nodemailer'
const EmailValidator = require('email-deep-validator');
const emailValidator = new EmailValidator();
const secret: string = process.env.ACCESS_TOKEN_SECRET as string;
export async function createUsers(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { firstName, lastName, email, password, confirm_password } = req.body;
    if ( password !== confirm_password ) {
      res.status(404).send({msg: "Password do not match"});
      return;
    }
    let finder = await notesUsers.findOne({email})
    if(!finder) {
      const { error } = await joiValidateSignup(req.body);
      if (error) {
        res.status(404).send(error.details[0].message);
        return;
      }
      const {validDomain} = await emailValidator.verify(email)
      if (validDomain) {
        const newUsers:obj = {
          firstName,
          lastName,
          email,
          password,
        };
        let token = await signToken(newUsers);
        const Email = email;
        const body = `
        <h2>Please click on the given <a href="http://localhost:3000/confirm/${token}">link</a> to activate your acount.</h2></br>
        <h3>This link expires in 15mins</h3>
        `
        //email services
        if (process.env.CONDITION !== 'test'){
          await sendEmail(Email, body)
         }
        res.status(201).send({ msg: 'A mail has been sent to you for verification!!!' });
      } else {
        res.status(404).send({ msg: 'Please provide a valid email address' });
      }
    }else {
      res.status(404).send({ msg: 'Email already exists' });
    }
  } catch (err: any) {
    console.log(err)
    res.status(404).send({ msg: 'Error!!!' });
    return;
  }
}
export async function confirmUsers(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const decoded:any = jwt.verify(req.params.token, secret);
    const { args } = decoded
    if (!args) {
        throw new Error("Thrown here");
    }
    await notesUsers.create(args)
    res.status(201).send({ msg: 'Created Successful!!!' });
  } catch (err: any) {
    res.status(404).send({ msg: 'Invalid Token!!!' });
    return;
  }
}