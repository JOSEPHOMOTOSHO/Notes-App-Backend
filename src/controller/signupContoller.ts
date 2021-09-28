import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { obj } from '../interfaces/interface';
import {  isEmailValid, joiValidateSignup, signToken } from '../middleware/joi';
import notesUsers from '../model/signupModel';
import sendEmail from '../nodemailer'
var co = require('co');
var validate = require('validate-email-dns');
const secret: string = process.env.ACCESS_TOKEN_SECRET as string;



export async function createUsers(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { firstName, lastName, email, password, confirm_password } = req.body;
    // if (!firstName || !lastName || !email || !password || !confirm_password   ) {
    //   res.status(404).send({msg: "Please fill in all fields" });
    //   return;
    // }

    if ( password !== confirm_password ) {
      res.status(404).send({msg: "Password do not match"});
      return;
    }
    let finder = await notesUsers.findOne({email})
    console.log(finder, "wserdtrfyguh")
    if(!finder) {
      const { error } = await joiValidateSignup(req.body);
      if (error) {
        res.status(404).send(error.details[0].message);
        return;
      }
      let { valid } = await isEmailValid(email);
      console.log(valid);

      // const valid = await co.wrap(validate)(email).then(function(correct:boolean) {
      //   if (correct) {
      //     console.log(correct, 'This email address is correct');
      //     return correct
      //   } else {
      //     console.log('This email address is incorrect');
      //   }
      // });
      console.log(valid, "dwghj")
      if (valid) {
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
        sendEmail(Email, body)
        res.status(201).send({ msg: 'A mail has been sent to you for verification!!!' });
      } else {
        res.status(404).send({ msg: 'Please provide a valid email address' });
      }
    }else {
      res.status(404).send({ msg: 'Email already exists' });
    }
  } catch (err: any) {
    console.log(err)
    res.status(404).send({ msg: 'Invalid Token!!!' });
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
    console.log(decoded, "decoded")
    const { args } = decoded
    if (!decoded) {
        throw new Error("Thrown here");
    }
    console.log(args, "fagvhdbjklsaKDAVB")
    await notesUsers.create(args)
    console.log(decoded, "1234567")
    res.status(201).send({ msg: 'Created Successful!!!' });
    console.log("decoded")
  } catch (err: any) {
    console.log(err)
    res.status(404).send({ msg: 'Error!!!' });
    return;
  }
}
