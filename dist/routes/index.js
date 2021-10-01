"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// var express = require('express');
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var passport = require('passport');
// import { authorization} from "../config/authorize";
// Welcome Page
router.get('/welcome', function (req, res) { return res.send('Protected Route' + req.user); });
router.get('/', function (req, res) { return res.send('You are out'); });
router.get('/login', function (req, res, next) {
    var message = req.flash('error');
    res.status(422).send(message[0]);
});
router.post('/login', function (req, res, next) {
    passport.authenticate('local', {
        successRedirect: '/profile/',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});
router.get('/logout', function (req, res) {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users');
});
module.exports = router;
