import express, { Request, Response, NextFunction } from 'express';

//Function to authorization the routes with password
function authorization(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    res.redirect('/');
  } else {
    next();
  }
}

//muaze

export default authorization;
