"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const passport_facebook_1 = require("passport-facebook");
// const  strategy = require('passport-facebook')
const signupModel_1 = __importDefault(require("../model/signupModel"));
module.exports = (passport) => {
    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });
    passport.use(new passport_facebook_1.Strategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL,
        profileFields: ['email', 'name'],
    }, function (accessToken, refreshToken, profile, done) {
        const { email, first_name, last_name, id } = profile._json; //password
        const userData = {
            email,
            firstName: first_name,
            lastName: last_name,
            facebookId: id
        };
        signupModel_1.default.findOne({ email }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (user) {
                return done(null, user);
            }
            if (!user) {
                new signupModel_1.default(userData).save();
                console.log(userData);
                return done(null, userData);
            }
        });
    }));
};
//# sourceMappingURL=userController.js.map