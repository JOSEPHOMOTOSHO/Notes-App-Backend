import express from 'express';
import passport from 'passport';
// import userController from './user.controller';

const router = express.Router();

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/fail',
  })
);

router.get('/fail', (req, res) => {
  res.send('Failed attempt');
});

router.get('/', (req, res) => {
  res.send('Success');
});
export = router;
