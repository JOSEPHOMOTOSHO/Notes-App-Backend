"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var joi_1 = require("../middleware/joi");
// import { updateUser } from '../controller/updateprofile';
var secret = process.env.ACCESS_TOKEN_SECRET;
var min = process.env.ACCESS_EXPIRES;
var days = process.env.COLLAB_ACCESS;
var users_1 = require("../controller/users");
var joi_2 = require("../middleware/joi");
// Welcome Page
router.get('/welcome', function (req, res) { return res.send('Protected Route' + req.user); });
router.get('/', function (req, res) { return res.send('You are out'); });
router.get('/login', function (req, res, next) {
    var message = req.flash('error');
    res.status(400).send(message[0]);
});
router.post('/login', function (req, res, next) {
    //   passport.authenticate('local', {
    //     successRedirect: '/users/profile/',
    //     failureRedirect: '/users/login',
    //     failureFlash: true,
    //   })(req, res, next);
    passport.authenticate("local", function (err, user, info) { return __awaiter(void 0, void 0, void 0, function () {
        var token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (err)
                        throw err;
                    if (!user) {
                        return [2 /*return*/, res.status(401).send("No User Exists")];
                    }
                    return [4 /*yield*/, (0, joi_1.collabToken)(user._id)];
                case 1:
                    token = _a.sent();
                    req.logIn(user, function (err) {
                        if (err)
                            throw err;
                        res.status(200).json({
                            msg: 'succesfully Authenticated',
                            token: token,
                            user: user
                        });
                    });
                    return [2 /*return*/];
            }
        });
    }); })(req, res, next);
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
router.post('/signup', joi_2.joiValidateSignup, users_1.createUsers);
router.get('/confirm/:token', users_1.confirmUsers);
router.put('/:_id', cloudimage_1.upload, users_1.updateUser);
router.get('/recovery-email', users_1.getEmailFromUser);
router.post('/recovery-email', users_1.resetPasswordLink);
router.get('/reset/:token', users_1.displayNewPasswordForm);
router.post('/reset', users_1.processNewPasswordFromUser);
router.post('/changePassword', authorization_passport_1.default, users_1.changePassword);
module.exports = router;
