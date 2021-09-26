import express, { Request, Response, NextFunction, Router } from 'express';
import jwt from 'jsonwebtoken';
import joi from 'joi';

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
  // const user = await user.findOne({ email: email });

  const validatorSchema = joi.object({
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
        .json({ status: 'Not found', message: 'User not found' });
    }

    const token = jwtToken.createToken(user);
    const link = `${req.protocol}://localhost:3000/forgotPassword/${token}`;

    await sendEmail(
      email,
      'noreply@notes.com',
      'Best to do change password',
      `
      <div>Click the link below to change your password</div><br/>
      <div>${link}</div>
      `,
    );

    return res.status(200).json({
      status: 'Okay',
      message:
        'Link to change your password has been successfully sent to mail, please check your inbox.',
    });
  } catch (err) {
    console.log('forgotPasswordLink =>', err);
    res
      .status(500)
      .json({ status: 'Server Error', message: 'Unable to process request' });
  }
}

//Function to get get new password from the user
async function getNewPasswordFromUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const ValidateSchema = Joi.object({
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
    const { password } = req.body;
    const { token } = req.params;
    const check = jwtToken.verifyToken(token);
    const hashedPassword = hashPassword(password);

    const updatedUser = await User.findByIdAndUpdate(
      check.userId,
      { password: hashedPassword },
      { new: true },
    );

    const { id, name, email } = updatedUser;

    return res.status(200).json({
      status: 'Successful',
      message: 'Password reset successful',
    });
    res.redirect('/');
  } catch (err) {
    console.log('forgotPassword =>', err);
    res
      .status(500)
      .json({ status: 'Service Error', message: 'Unable to process request' });
  }
}

export { getEmailFromUser, resetPasswordLink, getNewPasswordFromUser };
