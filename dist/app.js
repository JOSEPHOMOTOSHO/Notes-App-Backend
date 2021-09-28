"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv = require("dotenv").config();
const flash = require('connect-flash');
const session = require('express-session');
const passportSetup = require('./config/passport-config');
const changePassword_1 = __importDefault(require("./routes/changePassword"));
const forgotPassword_1 = __importDefault(require("./routes/forgotPassword"));
const signin_1 = __importDefault(require("./routes/signin"));
const signup_1 = __importDefault(require("./routes/signup"));
// import { run } from './db/mongoose';
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const passport_1 = __importDefault(require("passport"));
const cors_1 = __importDefault(require("cors"));
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const app = (0, express_1.default)();
// view engine setup
app.set('views', path_1.default.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// app.set('view engine', 'ejs')
// app.set("views", path.resolve( path.join(__dirname,"../", 'views')))
app.use(session({
    secret: process.env.SESS,
    resave: true,
    saveUninitialized: true,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
//Connect flash
app.use(flash());
//GLobal Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('sucess_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});
//app.get('/', (req:express.Request, res:express.Response)=>{res.render("signinpage")});
app.use('/auth', authRouter);
app.use('/profile', profileRouter);
app.use('/', signup_1.default);
app.use('/signin', signin_1.default);
app.use('/password', forgotPassword_1.default);
app.use('/changePassword', changePassword_1.default);
app.use('/testing', userRoutes_1.default);
// app.use(express.static(path.join(__dirname, '..', 'public')));
app.use((0, cors_1.default)());
require('./controller/userController')(passport_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use(function (err, req, res, _next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.send(err.message);
});
// const port = 5050;
// app.listen(port, () => console.log(`Server is running on port ${port}`));
exports.default = app;
//# sourceMappingURL=app.js.map