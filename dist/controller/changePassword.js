"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const signupModel_1 = __importDefault(require("../model/signupModel"));
async function changePassword(req, res) {
    const user = req.user;
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const validPassword = await bcryptjs_1.default.compare(oldPassword, user.password);
    try {
        if (validPassword) {
            const updatedPassword = signupModel_1.default.findByIdAndUpdate(user._id, { password: newPassword }, { new: true });
        }
        else {
            res
                .status(404)
                .json({ status: 'Not found', message: 'Not a valid password' });
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