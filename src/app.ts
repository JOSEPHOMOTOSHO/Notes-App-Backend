import createError, { HttpError } from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
const dotenv = require("dotenv").config()
import router from './routes/userRoutes';
import passport from 'passport';
import cors from 'cors';
import session from 'express-session'
const flash = require('connect-flash');
const passportSetup = require('./config/passport-config')
require('./controller/userController')(passport)
import noteRoute from './routes/noteRoute';
require('./config/passport')(passport)
const folderRoutes = require ('./routes/folder')


const authRouter = require('./routes/auth');
// const profileRouter = require('./routes/profile');
const indexRouter = require('./routes/index')
const getAndEditRoutes = require('./routes/getAndEditRoute')

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

app.use(session({
  secret:process.env.SESSION_SECRET!,
  resave: true,
  saveUninitialized:true,
}))

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

app.use('/auth', authRouter);
// app.use('/profile', profileRouter);
app.use('/users', indexRouter);
app.use('/testing', router)
app.use('/note', noteRoute)
app.use('/folder',folderRoutes)
app.use('/sprint2',getAndEditRoutes)

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



export default app
