import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
const dotenv = require("dotenv").config()
import changePassword from './routes/changePassword'
import forgotPassword from './routes/forgotPassword'
import signIn from './routes/signin';
import signupRoute from './routes/signup';


const app = express();



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs')
app.set("views", path.resolve( path.join(__dirname,"../", 'views')))

//app.get('/', (req:express.Request, res:express.Response)=>{res.render("signinpage")});
app.use('/', signupRoute);
app.use('/', signIn);
app.use('/password', forgotPassword)
app.use('/changePassword', changePassword)




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (
  err: createError.HttpError,
  req: express.Request,
  res: express.Response,
  _next: express.NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

export default app;
