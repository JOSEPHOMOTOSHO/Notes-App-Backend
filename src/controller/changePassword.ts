import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import userModel from '../model/signupModel';
import RequestInterface from '../interfaces/interface';
import { JwtPayload } from 'jsonwebtoken';


async function changePassword(req: RequestInterface, res: Response) {
  const user = req.user as JwtPayload;
  const { oldPassword, newPassword, confirmPassword } = req.body;

  const validPassword = await bcrypt.compare(oldPassword, user.password);
  try {
    if (validPassword) {
      const updatedPassword = userModel.findByIdAndUpdate(
        user._id,
        { password: newPassword },
        { new: true },
      );
    } else {
      res
        .status(404)
        .json({ status: 'Not found', message: 'Not a valid password' });
    }
  } catch (err) {
    console.log('changePassword =>', err);
    res.status(500).send({
      status: 'Not found',
      message: 'Unable to process request',
    });
  }
}

export default changePassword;
