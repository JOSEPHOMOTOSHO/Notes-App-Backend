import express, { Request, Response, NextFunction } from 'express';

//Function to authorization the routes with password
function authorization(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    console.log("user not found: ",req.user)
    res.redirect('/users');
  } else {
    console.log(req.user.id)
    next();
  }
}

//muaze

export default authorization;
