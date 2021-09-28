import express, { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken'
import RequestInterface from '../interfaces/interface'
import dotenv from 'dotenv'
import joi from 'joi'

function authorization(req: RequestInterface, res: Response, next: NextFunction) {
  const jwtToken = req.headers.token || req.cookies.token
  if (!jwtToken) {
    return res.status(401).json({
      status: '401 Not Authorized',
      message: "Please login to have access"})
  }
  try{
    const authorization = jwt.verify(
      jwtToken.toString(),
      process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload;
      console.log("authorization says:",authorization)
    req.user = authorization.user_id;
    next();
  } catch(err) {
    res.status(401).json({
      status: "Failed",
      message: "Invalid token"});
  }
}

export default authorization;


