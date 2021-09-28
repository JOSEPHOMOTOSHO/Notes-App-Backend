"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const signupModel_1 = __importDefault(require("../model/signupModel"));
async function changePassword(req, res) {
    const user_id = req.user;
    console.log("changePassword:", user_id);
    let { oldPassword, newPassword, confirmPassword } = req.body;
    if (newPassword !== confirmPassword) {
        res
            .status(400)
            .json({
            status: 'Client error',
            message: 'Password does not match'
        });
    }
    const user = await signupModel_1.default.findOne({ id: user_id });
    console.log(user.password);
    const validPassword = await bcryptjs_1.default.compare(oldPassword, user.password);
    newPassword = await bcryptjs_1.default.hash(newPassword, 10);
    try {
        if (validPassword) {
            const updatedPassword = await signupModel_1.default.findByIdAndUpdate(user._id, { password: newPassword }, { new: true });
            return res.status(200).json({
                status: 'Ok',
                message: "Password change successful"
            });
        }
        else {
            res.status(404).json({
                status: 'Not found',
                message: 'Not a valid password',
            });
        }
    }
    catch (err) {
        console.log('changePassword =>', err);
        res.status(500).send({
            status: 'Not found',
            message: 'Unable to process request',
        });
    }
}
exports.default = changePassword;
//# sourceMappingURL=changePassword.js.map