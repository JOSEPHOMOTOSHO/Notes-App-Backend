"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processNewPasswordFromUser = exports.displayNewPasswordForm = exports.resetPasswordLink = exports.getEmailFromUser = void 0;
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const joi_1 = __importDefault(require("joi"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const signupModel_1 = __importDefault(require("../model/signupModel"));
const nodemailer_1 = __importDefault(require("../nodemailer"));
const app = (0, express_1.default)();
//Function to get email from the user
function getEmailFromUser(req, res) {
    return res.render('getEmail');
}
exports.getEmailFromUser = getEmailFromUser;
//Function to send a reset password link to the user's email address
async function resetPasswordLink(req, res, next) {
    const { email } = req.body;
    const user = await signupModel_1.default.findOne({ email: email });
    const validatorSchema = joi_1.default.object({
        email: joi_1.default.string().required().min(6).max(50).email(),
    });
    const validator = validatorSchema.validate(req.body);
    try {
        if (validator.error) {
            return res.status(404).json({
                status: 'Not found',
                message: validator.error.details[0].message,
            });
        }
        if (!user) {
            return res
                .status(404)
                .json({ status: 'Not found', message: 'User not found' });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
        const link = `${req.protocol}://localhost:3000/password/reset/${token}`;
        const Email = email;
        const body = `
    <div>Click the link below to change your password</div><br/>
    <div>${link}</div>
    `;
        await (0, nodemailer_1.default)(Email, body);
        return res.status(200).render('fakeEmailView', { link });
    }
    catch (err) {
        console.log('forgotPasswordLink =>', err);
        res
            .status(500)
            .json({ status: 'Server Error', message: 'Unable to process request' });
    }
}
exports.resetPasswordLink = resetPasswordLink;
//Function to get get new password from the user
async function displayNewPasswordForm(req, res) {
    const token = req.params.token;
    if (!token) {
        res.status(401).json({
            status: '401 Unauthorized',
            message: 'Token not found',
        });
    }
    try {
        const verified = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log(verified);
        res.render('resetPassword', { token: token });
    }
    catch (err) {
        console.log('displayNewPasswordForm => ', err);
        res.status(401).json({
            status: '401 Unauthorized',
            message: 'Invalid token',
        });
    }
}
exports.displayNewPasswordForm = displayNewPasswordForm;
//Function to process the new password from the user
async function processNewPasswordFromUser(req, res, next) {
    const ValidateSchema = joi_1.default.object({
        token: joi_1.default.string().required(),
        password: joi_1.default.string().required().min(6).max(20),
        confirmPassword: joi_1.default.string().required().min(6).max(20),
    });
    const validator = ValidateSchema.validate(req.body);
    if (validator.error) {
        return res.status(400).json({
            message: validator.error.details[0].message,
        });
    }
    try {
        const { password, token } = req.body;
        const check = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const hashedPassword = bcryptjs_1.default.hashSync(password, 12);
        const updatedUser = await signupModel_1.default.findByIdAndUpdate(check.userId, { password: hashedPassword }, { new: true });
        const { id, name, email } = updatedUser;
        return res.redirect('/');
        // return res.status(200).json({
        //   status: 'Successful',
        //   message: 'Password reset successful',
        // });
    }
    catch (err) {
        console.log('forgotPassword =>', err);
        res
            .status(500)
            .json({ status: 'Service Error', message: 'Unable to process request' });
    }
}
exports.processNewPasswordFromUser = processNewPasswordFromUser;
//# sourceMappingURL=forgotPassword.js.map