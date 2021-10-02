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
exports.processNewPasswordFromUser = exports.displayNewPasswordForm = exports.resetPasswordLink = exports.getEmailFromUser = void 0;
var express_1 = __importDefault(require("express"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var joi_1 = __importDefault(require("joi"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var signupModel_1 = __importDefault(require("../model/signupModel"));
var nodemailer_1 = __importDefault(require("../nodemailer"));
var app = (0, express_1.default)();
//Function to get email from the user
function getEmailFromUser(req, res) {
    return res.render('getEmail');
}
exports.getEmailFromUser = getEmailFromUser;
//Function to send a reset password link to the user's email address
function resetPasswordLink(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var email, user, validatorSchema, validator, token_1, Email, link, body, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = req.body.email;
                    return [4 /*yield*/, signupModel_1.default.findOne({ email: email })];
                case 1:
                    user = _a.sent();
                    validatorSchema = joi_1.default.object({
                        email: joi_1.default.string().required().min(6).max(50).email(),
                    });
                    validator = validatorSchema.validate(req.body);
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    if (validator.error) {
                        return [2 /*return*/, res.status(404).json({
                                status: 'Not found',
                                message: validator.error.details[0].message,
                            })];
                    }
                    if (!user) {
                        return [2 /*return*/, res
                                .status(404)
                                .json({
                                status: 'Not found',
                                message: 'User not found'
                            })];
                    }
                    token_1 = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
                    Email = email;
                    link = req.protocol + "://localhost:3000/password/reset/" + token_1;
                    body = "\n    <div>Click the link below to reset your password</div><br/>\n    <div>" + link + "</div>\n    ";
                    return [4 /*yield*/, (0, nodemailer_1.default)(Email, body)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, res.status(200).render('fakeEmailView', { link: link })];
                case 4:
                    err_1 = _a.sent();
                    res
                        .status(500)
                        .json({
                        status: 'Server Error',
                        message: 'Unable to process request'
                    });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.resetPasswordLink = resetPasswordLink;
//Function to get get new password from the user
function displayNewPasswordForm(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var token, verified;
        return __generator(this, function (_a) {
            token = req.params.token;
            if (!token) {
                res.status(401).json({
                    status: '401 Unauthorized',
                    message: 'Token not found',
                });
            }
            try {
                verified = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
                res.render('resetPassword', { token: token });
            }
            catch (err) {
                console.log('displayNewPasswordForm => ', err);
                res.status(401).json({
                    status: '401 Unauthorized',
                    message: 'Invalid token',
                });
            }
            return [2 /*return*/];
        });
    });
}
exports.displayNewPasswordForm = displayNewPasswordForm;
//Function to process the new password from the user
function processNewPasswordFromUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var ValidateSchema, validator, _a, password, token_2, check, hashedPassword, updatedUser, id, name_1, email, err_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    ValidateSchema = joi_1.default.object({
                        token: joi_1.default.string().required(),
                        password: joi_1.default.string().required().min(6).max(20),
                        confirmPassword: joi_1.default.string().required().min(6).max(20),
                    });
                    validator = ValidateSchema.validate(req.body);
                    if (validator.error) {
                        return [2 /*return*/, res.status(400).json({
                                message: validator.error.details[0].message,
                            })];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    _a = req.body, password = _a.password, token_2 = _a.token;
                    check = jsonwebtoken_1.default.verify(token_2, process.env.ACCESS_TOKEN_SECRET);
                    hashedPassword = bcryptjs_1.default.hashSync(password, 12);
                    return [4 /*yield*/, signupModel_1.default.findByIdAndUpdate(check.userId, { password: hashedPassword }, { new: true })];
                case 2:
                    updatedUser = _b.sent();
                    id = updatedUser.id, name_1 = updatedUser.name, email = updatedUser.email;
                    // return res.redirect('/');
                    return [2 /*return*/, res.status(200).json({
                            status: 'Successful',
                            message: 'Password reset successful',
                        })];
                case 3:
                    err_2 = _b.sent();
                    console.log('forgotPassword =>', err_2);
                    res
                        .status(500)
                        .json({
                        status: 'Service Error',
                        message: 'Unable to process request'
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.processNewPasswordFromUser = processNewPasswordFromUser;
