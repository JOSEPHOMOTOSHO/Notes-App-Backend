import { Profile } from "passport";
import {Use, DatabaseUserInterface} from '../interfaces/interface'
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const User = require('../model/signupModel')
import User from '../model/signupModel';


// passport.serializeUser((user,done))


passport.serializeUser((user:Use, done:Function)=>{
    done(null, user.id);
  });

  passport.deserializeUser((id:string, done:Function)=> {
    User.findById(id).then((user:DatabaseUserInterface)=>{
        done(null, user)
    })
  });

passport.use(
    new GoogleStrategy({
        clientID : process.env.CLIENT_ID_GOOGLE,
        clientSecret : process.env.SECRET,
        callbackURL:'/auth/google/redirect',
    },async(accessToken:string, refreshToken:string, profile:Profile, done:Function)=>{
          console.log("1")
          console.log(profile.id)
        let previousUser = await User.findOne({googleId:profile.id})
        console.log("2")
        // console.log(previousUser)
        // console.log(previousUser.googleId)
         if(previousUser){
            // console.log(previousUser);
            done(null, previousUser)

        }else{
            let googleuser = {
                googleId : profile.id,
                lastName : profile.name!.familyName,
                firstName : profile.name!.givenName,
                email : profile.emails![0].value
            }
            let newuser = await User.create(googleuser)
            console.log(newuser);
            done(null, newuser)
        }



    })
)
