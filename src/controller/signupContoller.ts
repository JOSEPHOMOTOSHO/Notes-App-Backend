import { Request, Response, NextFunction } from 'express';
import { string } from 'joi';
import { isEmailValid, joiValidateSignup, signToken } from '../middleware/joi';
// import notesUsers from '../model/signupModel';

interface obj{
  firstName:string,
  lastName:string,
  email:string,
  password:string
}
export async function createUsers(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { firstName, lastName, email, password } = req.body;
    let { valid } = await isEmailValid(email);
    console.log(valid);
    if (valid) {
      const { error } = await joiValidateSignup(req.body);
      if (error) {
        res.status(404).send(error.details[0].message);
        return;
      }
      const newUsers:obj = {
        firstName,
        lastName,
        email,
        password,
      };
      let token = await signToken(newUsers);
      // const newUsers = await notesUsers.create({
      //   firstName,
      //   lastName,
      //   email,
      //   password,
      // });

      res.status(201).send({ msg: 'Created Successful!!!' });
    } else {
      res.status(404).send({ msg: 'Please provide a valid email address' });
    }
  } catch (err: any) {
    res.status(404).send({ msg: 'Error!!!' });
    return;
  }
}
