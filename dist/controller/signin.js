"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const signupModel_1 = __importDefault(require("../model/signupModel"));
const joi_1 = __importDefault(require("joi"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
async function signIn(req, res, next) {
    const validateSchema = joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(7).max(20).required()
    });
    const validationResult = await validateSchema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).json({
            status: "Not Found",
            message: validationResult.error.details[0].message
        });
    }
    const existingUser = await signupModel_1.default.findOne({
        email: req.body.email,
    }).select("+password");
    if (!existingUser) {
        return res.status(404).json({
            status: "Not found",
            message: "Account user does not exist"
        });
    }
    const passwordisValid = await bcryptjs_1.default.compare(req.body.password, existingUser.password);
    if (!passwordisValid) {
        return res.status(400).json({
            status: "Not Found",
            message: "Invalid password"
        });
    }
    const token = jsonwebtoken_1.default.sign({ user_id: existingUser._id, user_email: existingUser.email }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_EXPIRES
    });
    // res.cookie("token", token, { httpOnly: true})
    res.clearCookie("token");
    res.status(200).json({
        status: "Successful",
        message: "Signed in sucessfully",
        token
    });
}
exports.default = signIn;
//# sourceMappingURL=signin.js.map