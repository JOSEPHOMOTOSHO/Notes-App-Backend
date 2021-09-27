import passport from 'passport';
import { Strategy as FacebookStrategy, Profile } from 'passport-facebook';
// const  strategy = require('passport-facebook')

import User from '../model/userModel';

// const FacebookStrategy = strategy.Strategy;

export = (passport: passport.Authenticator) => {
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (obj, done) {
    done(null, obj as any);
  });

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.CLIENT_ID as string,
        clientSecret: process.env.CLIENT_SECRET as string,
        callbackURL: process.env.CALLBACK_URL as string,
        profileFields: ['email', 'name'],
      },
      function (
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done,
      ) {
        const { email, first_name, last_name } = profile._json; //password
        const userData = {
          email,
          firstName: first_name,
          lastName: last_name,
        };

        User.findOne({ email }, (err:any, user:any) => {
          if (err) {
            return done(err);
          }
          if (user) {
            return done(null, user);
          }
          if (!user) {
            new User(userData).save();
            return done(null, userData);
          }
        });
      },
    ),
  );
};
