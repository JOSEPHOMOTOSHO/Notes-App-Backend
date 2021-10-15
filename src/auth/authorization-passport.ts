import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import User from "../model/signupModel";

//Function to authorization the routes with password
async function authorization(req: Request, res: Response, next: NextFunction) {
  const token = req.user ||req.query.token || req.headers["x-access-token"]
    if(!token){
    return res.redirect('/users');
  } 
  if(req.user){
    next()
  }
  if(req.headers["x-access-token"]){
    
    let secret =  process.env.ACCESS_TOKEN_SECRET as string
    const decoded:any = jwt.verify(token, secret);
    if (!decoded.args) {
      
        throw new Error("Thrown here");
    }
    let currentUser = await User.findById(decoded.args)
 
    req.user = currentUser
   
    next()
  }
 
  
}

//muaze

export default authorization;
