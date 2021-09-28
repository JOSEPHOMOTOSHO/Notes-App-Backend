"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmailValid = exports.signToken = exports.joiValidateSignup = void 0;
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const emailValidator = require('deep-email-validator');
async function joiValidateSignup(validate) {
    const todoSignupSchema = joi_1.default
        .object({
        firstName: joi_1.default.string().trim().min(3).max(250).required(),
        lastName: joi_1.default.string().trim().min(3).max(250).required(),
        password: joi_1.default.string().min(7).required().alphanum(),
        confirm_password: joi_1.default.string().min(7).required().alphanum(),
        email: joi_1.default
            .string()
            .trim()
            .lowercase()
    })
        .with('password', 'confirm_password');
    const validated = await todoSignupSchema.validate(validate);
    return validated;
}
exports.joiValidateSignup = joiValidateSignup;
const secret = process.env.ACCESS_TOKEN_SECRET;
const hrs = process.env.ACCESS_EXPIRES;
const signToken = async (args) => {
    return jsonwebtoken_1.default.sign({ args }, secret, {
        expiresIn: hrs,
    });
};
exports.signToken = signToken;
async function isEmailValid(email) {
    return emailValidator.validate(email);
}
exports.isEmailValid = isEmailValid;
//# sourceMappingURL=joi.js.map