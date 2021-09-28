"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// var express = require('express');
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const passport = require('passport');
// import { authorization} from "../config/authorize";
// Welcome Page
router.get('/welcome', (req, res) => res.send('Protected Route' + req.user));
router.get('/', (req, res) => res.send('You are out'));
router.get('/login', function (req, res, next) {
    let message = req.flash('error');
    res.send(message[0]);
});
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/users/welcome',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/signin/login');
});
module.exports = router;
//# sourceMappingURL=index.js.map