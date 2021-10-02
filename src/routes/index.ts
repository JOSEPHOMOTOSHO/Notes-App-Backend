import express, {Request, Response, NextFunction} from "express"
const router = express.Router();
const passport = require('passport');
// import changePassword from '../controller/changePassword';
import authorization from '../auth/authorization-passport';
// import { confirmUsers, createUsers } from '../controller/signupContoller';
import { upload } from '../middleware/cloudimage'
// import { updateUser } from '../controller/updateprofile';
import {
  processNewPasswordFromUser,
  resetPasswordLink,
  getEmailFromUser,
  displayNewPasswordForm,
  updateUser,
  confirmUsers,
  createUsers,
  changePassword,
} from '../controller/users';

import { joiValidateSignup } from "../middleware/joi";

// Welcome Page
router.get('/welcome',  (req, res) => res.send('Protected Route'+req.user));
router.get('/', (req, res) => res.send('You are out'));
router.get('/login', function(req:Request, res:Response, next:NextFunction) {
 let message =  req.flash('error')
  res.status(400).send(message[0])
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/users/profile/',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

router.get('/logout', (req:Request, res:Response) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users');
});
router.get('/profile',  function(req:Request, res:Response, next:NextFunction) {  
  //   res.render('home');
    res.send(req.user)
  });

  router.post('/signup', joiValidateSignup, createUsers);

  router.get('/confirm/:token', confirmUsers);

  router.put('/:_id', upload, updateUser) 

  router.get('/recovery-email', getEmailFromUser);
  router.post('/recovery-email', resetPasswordLink);
  
  router.get('/reset/:token', displayNewPasswordForm);
  router.post('/reset', processNewPasswordFromUser);
  router.post('/changePassword', authorization, changePassword)

module.exports = router;