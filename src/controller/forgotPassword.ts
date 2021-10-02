import express, { Request, Response, NextFunction, Router } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import Joi from 'joi';
import bcrypt from 'bcryptjs';
import userModel from '../model/signupModel';
import { token } from 'morgan';
import sendEmail from '../nodemailer';

const app = express();

//Function to get email from the user
function getEmailFromUser(req: Request, res: Response) {
  return res.render('getEmail');
}

//Function to send a reset password link to the user's email address
async function resetPasswordLink(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { email } = req.body;
  const user = await userModel.findOne({ email: email });

  const validatorSchema = Joi.object({
    email: Joi.string().required().min(6).max(50).email(),
  });
  const validator = validatorSchema.validate(req.body);

  try {
    if (validator.error) {
      return res.status(404).json({
        status: 'Not found',
        message: validator.error.details[0].message,
      });
    }

    if (!user) {
      return res
        .status(404)
        .json({ 
          status: 'Not found', 
          message: 'User not found' });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: '24h' },
    );

    const Email = email;
    const link = `${req.protocol}://localhost:3000/users/password/reset/${token}`;
    const body = `
    <div>Click the link below to reset your password</div><br/>
    <div>${link}</div>
    `;

    await sendEmail(Email, body);
    return res.status(200).render('fakeEmailView', { link });

  } catch (err) {
    res
      .status(500)
      .json({ 
        status: 'Server Error', 
        message: 'Unable to process request' });
  }
}

//Function to get get new password from the user
async function displayNewPasswordForm(req: Request, res: Response) {
  const token = req.params.token;

  if (!token) {
    res.status(401).json({
      status: '401 Unauthorized',
      message: 'Token not found',
    });
  }
  try {
    const verified = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string,
    ) as JwtPayload;
  
    res.render('resetPassword', { token: token });

  } catch (err) {
    console.log('displayNewPasswordForm => ', err);
    res.status(401).json({
      status: '401 Unauthorized',
      message: 'Invalid token',
    });
  }
}

//Function to process the new password from the user
async function processNewPasswordFromUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const ValidateSchema = Joi.object({
    token: Joi.string().required(),
    password: Joi.string().required().min(6).max(20),
    confirmPassword: Joi.string().required().min(6).max(20),
  });

  const validator = ValidateSchema.validate(req.body);
  if (validator.error) {
    return res.status(400).json({
      message: validator.error.details[0].message,
    });
  }

  try {
    const { password, confirmPassword, token } = req.body;
    if (password !== confirmPassword) {
      res
        .status(400)
        .json({
          status: 'Client error',
          message: 'Password does not match' });
    }

    const check = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string,
    ) as JwtPayload;

    const hashedPassword = bcrypt.hashSync(password, 12);

    const updatedUser = await userModel.findByIdAndUpdate(
      check.userId,
      { password: hashedPassword },
      { new: true },
    );

    const { id, name, email } = updatedUser;

    // return res.redirect('/');
    return res.status(200).json({
      status: 'Successful',
      message: 'Password reset successful',
    });

  } catch (err) {
    console.log('forgotPassword =>', err);
    res
      .status(500)
      .json({ 
        status: 'Service Error', 
        message: 'Unable to process request' });
  }
}

export {
  getEmailFromUser,
  resetPasswordLink,
  displayNewPasswordForm,
  processNewPasswordFromUser,
};

