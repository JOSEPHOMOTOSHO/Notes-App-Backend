"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// var express = require('express');
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const passport = require("passport");
router.get('/google/redirect', passport.authenticate('google'), function (req, res, next) {
    res.redirect('/profile/');
});
router.get('/goal', function (req, res, next) {
    // res.send('gkjr')
    res.redirect('/profile/');
});
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));
module.exports = router;
//# sourceMappingURL=auth.js.map