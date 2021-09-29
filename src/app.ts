import createError, { HttpError } from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
const dotenv = require("dotenv").config()
import changePassword from './routes/changePassword'
import forgotPassword from './routes/forgotPassword'
import signIn from './routes/signin';
import signupRoute from './routes/signup';
// import { run } from './db/mongoose';
import router from './routes/userRoutes';
import passport from 'passport';
import cors from 'cors';
import session from 'express-session'

require('./controller/userController')(passport)

const app = express();
// run();


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
  secret: process.env.SESSION_SECRET!,
  resave: true,
  saveUninitialized: true,
}))


app.use(cors());
app.use(passport.initialize());
app.use(passport.session())

//app.get('/', (req:express.Request, res:express.Response)=>{res.render("signinpage")});
app.use('/', signupRoute);
app.use('/signin', signIn);
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
