import createError, { HttpError } from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
const dotenv = require("dotenv").config()
import changePassword from './routes/changePassword'
import forgotPassword from './routes/forgotPassword'
import signupRoute from './routes/signup';
import router from './routes/userRoutes';
import passport from 'passport';
import cors from 'cors';
import session from 'express-session'
const flash = require('connect-flash');
const passportSetup = require('./config/passport-config')
import editProfile from './routes/editprofile'

require('./controller/userController')(passport)

require('./config/passport')(passport)


const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const indexRouter = require('./routes/index')

const app = express();
// run();

declare module "express" {
  interface Request {
      flash?: any,
      isAuthenticated?:any,
  }
}

// view engine setup
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.set('view engine', 'ejs')
// app.set("views", path.resolve( path.join(__dirname,"../", 'views')))


app.use(session({
  secret:process.env.SESSION_SECRET!,
  resave: true,
  saveUninitialized:true,
}))

app.use('/users', editProfile)

app.use(passport.initialize());
app.use(passport.session());

//Connect flash
app.use(flash())

//GLobal Vars
app.use((req:Request, res:Response, next:NextFunction)=>{
  res.locals.success_msg = req.flash('sucess_msg');
  res.locals.error_msg=req.flash('error_msg');
  next();
})

app.use(cors());

//Initialize Passport
app.use(passport.initialize());
app.use(passport.session())

//app.get('/', (req:express.Request, res:express.Response)=>{res.render("signinpage")});

app.use('/auth', authRouter);
app.use('/profile', profileRouter);
app.use('/', signupRoute);
app.use('/users', indexRouter);
app.use('/password', forgotPassword)
app.use('/changePassword', changePassword)
app.use('/testing', router)


// app.use(express.static(path.join(__dirname, '..', 'public')));

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (
  err: HttpError,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

// const port = 5050;
// app.listen(port, () => console.log(`Server is running on port ${port}`));
export default app
