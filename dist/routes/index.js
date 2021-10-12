"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var passport = require('passport');
// import changePassword from '../controller/changePassword';
var authorization_passport_1 = __importDefault(require("../auth/authorization-passport"));
// import { confirmUsers, createUsers } from '../controller/signupContoller';
var cloudimage_1 = require("../middleware/cloudimage");
// import { updateUser } from '../controller/updateprofile';
var users_1 = require("../controller/users");
var joi_1 = require("../middleware/joi");
// Welcome Page
router.get('/welcome', function (req, res) { return res.send('Protected Route' + req.user); });
router.get('/', function (req, res) { return res.send('You are out'); });
router.get('/login', function (req, res, next) {
    var message = req.flash('error');
    res.status(400).send(message[0]);
});
router.post('/login', function (req, res, next) {
    passport.authenticate('local', {
        successRedirect: '/users/profile/',
        failureRedirect: '/users/login',
        failureFlash: true,
    })(req, res, next);
});
router.get('/logout', function (req, res) {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users');
});
router.get('/profile', function (req, res, next) {
    //   res.render('home');
    res.send(req.user);
});
router.post('/signup', joi_1.joiValidateSignup, users_1.createUsers);
router.get('/confirm/:token', users_1.confirmUsers);
router.put('/:_id', cloudimage_1.upload, users_1.updateUser);
router.get('/recovery-email', users_1.getEmailFromUser);
router.post('/recovery-email', users_1.resetPasswordLink);
router.get('/reset/:token', users_1.displayNewPasswordForm);
router.post('/reset', users_1.processNewPasswordFromUser);
router.post('/changePassword', authorization_passport_1.default, users_1.changePassword);
module.exports = router;
