"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmUsers = exports.createUsers = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const joi_1 = require("../middleware/joi");
const signupModel_1 = __importDefault(require("../model/signupModel"));
const nodemailer_1 = __importDefault(require("../nodemailer"));
var co = require('co');
var validate = require('validate-email-dns');
const secret = process.env.ACCESS_TOKEN_SECRET;
async function createUsers(req, res, next) {
    try {
        const { firstName, lastName, email, password, confirm_password } = req.body;
        // if (!firstName || !lastName || !email || !password || !confirm_password   ) {
        //   res.status(404).send({msg: "Please fill in all fields" });
        //   return;
        // }
        if (password !== confirm_password) {
            res.status(404).send({ msg: "Password do not match" });
            return;
        }
        let finder = await signupModel_1.default.findOne({ email });
        console.log(finder, "wserdtrfyguh");
        if (!finder) {
            const { error } = await (0, joi_1.joiValidateSignup)(req.body);
            if (error) {
                res.status(404).send(error.details[0].message);
                return;
            }
            let { valid } = await (0, joi_1.isEmailValid)(email);
            console.log(valid);
            // const valid = await co.wrap(validate)(email).then(function(correct:boolean) {
            //   if (correct) {
            //     console.log(correct, 'This email address is correct');
            //     return correct
            //   } else {
            //     console.log('This email address is incorrect');
            //   }
            // });
            console.log(valid, "dwghj");
            if (valid) {
                const newUsers = {
                    firstName,
                    lastName,
                    email,
                    password,
                };
                let token = await (0, joi_1.signToken)(newUsers);
                const Email = email;
                const body = `
        <h2>Please click on the given <a href="http://localhost:3000/confirm/${token}">link</a> to activate your acount.</h2></br>
        <h3>This link expires in 15mins</h3>
        `;
                //email services
                (0, nodemailer_1.default)(Email, body);
                res.status(201).send({ msg: 'A mail has been sent to you for verification!!!' });
            }
            else {
                res.status(404).send({ msg: 'Please provide a valid email address' });
            }
        }
        else {
            res.status(404).send({ msg: 'Email already exists' });
        }
    }
    catch (err) {
        console.log(err);
        res.status(404).send({ msg: 'Invalid Token!!!' });
        return;
    }
}
exports.createUsers = createUsers;
async function confirmUsers(req, res, next) {
    try {
        const decoded = jsonwebtoken_1.default.verify(req.params.token, secret);
        console.log(decoded, "decoded");
        const { args } = decoded;
        if (!decoded) {
            throw new Error("Thrown here");
        }
        console.log(args, "fagvhdbjklsaKDAVB");
        await signupModel_1.default.create(args);
        console.log(decoded, "1234567");
        res.status(201).send({ msg: 'Created Successful!!!' });
        console.log("decoded");
    }
    catch (err) {
        console.log(err);
        res.status(404).send({ msg: 'Error!!!' });
        return;
    }
}
exports.confirmUsers = confirmUsers;
//# sourceMappingURL=signupContoller.js.map