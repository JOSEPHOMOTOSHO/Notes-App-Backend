// var express = require('express');
import express, {Request, Response, NextFunction} from "express"
const router = express.Router();
const passport = require('passport');
// import { authorization} from "../config/authorize";
// Welcome Page
router.get('/welcome',  (req, res) => res.send('Protected Route'+req.user));
router.get('/', (req, res) => res.send('You are out'));
router.get('/login', function(req:Request, res:Response, next:NextFunction) {
 let message =  req.flash('error')
  res.status(422).send(message[0])
});
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/profile/',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});
router.get('/logout', (req:Request, res:Response) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users');
});
module.exports = router;