"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const User = require('../model/signupModel')
const signupModel_1 = __importDefault(require("../model/signupModel"));
// passport.serializeUser((user,done))
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    signupModel_1.default.findById(id).then((user) => {
        done(null, user);
    });
});
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID_GOOGLE,
    clientSecret: process.env.SECRET,
    callbackURL: '/auth/google/redirect',
}, async (accessToken, refreshToken, profile, done) => {
    console.log("1");
    let previousUser = await signupModel_1.default.findOne({ googleId: profile.id });
    console.log("2");
    if (previousUser) {
        // console.log(previousUser);
        done(null, previousUser);
    }
    else {
        let googleuser = {
            googleId: profile.id,
            lastName: profile.name.familyName,
            firstName: profile.name.givenName,
            email: profile.emails[0].value
        };
        let newuser = await signupModel_1.default.create(googleuser);
        console.log(newuser);
        done(null, newuser);
    }
}));
//# sourceMappingURL=passport-config.js.map