import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import userModel from '../model/signupModel';
import RequestInterface from '../interfaces/interface';
import { JwtPayload } from 'jsonwebtoken';

async function changePassword(req: RequestInterface, res: Response) {
  const user_id = req.user as JwtPayload;
  let { oldPassword, newPassword, confirmPassword } = req.body;
  if (newPassword !== confirmPassword) {
    res
      .status(400)
      .json({
        status: 'Client error',
        message: 'Password does not match' });
  }

  const user = await userModel.findById(user_id);
  const validPassword = bcrypt.compareSync(oldPassword, user.password);
  const newPasswords = await bcrypt.hash(newPassword, 10);

  try {
    if (validPassword) {
      const updatedPassword = await userModel.findByIdAndUpdate(
        user._id,
        { password: newPasswords },
        { new: true },
      );

      return res.status(200).json({
        status: 'Ok',
        message: "Password change successful"
      });
    } else {
      res.status(404).json({
        status: 'Not found',
        message: 'Not a valid password',
      });
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
