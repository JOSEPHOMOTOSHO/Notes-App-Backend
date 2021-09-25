import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import RequestInterface from '../interfaces/interface'
import dotenv from 'dotenv'
import joi from 'joi'

function authorization(req: RequestInterface, res: Response, next: NextFunction) {
  const jwtToken = req.cookies.token || req.headers.token
  if (!jwtToken) {
    return res.status(401).json({status: '401 Not Authorized', message: "Please login to have access"})
  }
  try{
    const authorization = jwt.verify(jwtToken.toString(), process.env.TOKEN as string);
    req.user = authorization;
    next();
  } catch(err) {
    res.status(401).json({status: "Failed", message: "Invalid token"});
  }
}

export default authorization;


