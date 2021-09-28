"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { } from "../util";
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UsersSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: [true, 'Name is needed'],
    },
    lastName: {
        type: String,
        required: [true, 'Name is needed'],
    },
    email: {
        type: String,
        required: [true, 'Email is needed'],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Password needed'],
        minlength: [7, 'Password length should not be less than 5'],
    },
    location: {
        type: String
    },
    gender: {
        type: String
    },
    role: {
        type: String,
    },
    about: {
        type: String,
    },
});
// const UsersSchema = new mongoose.Schema<objInt>(
//   {
//     firstName: {
//       type: String,
//       required: [true, 'Name is needed'],
//     },
//     lastName: {
//       type: String,
//       required: [true, 'Name is needed'],
//     },
//     email: {
//       type: String,
//       required: [true, 'Email is needed'],
//       unique: true,
//       lowercase: true,
//     },
//     googleId:{
//       type : String,
//       // required : true,
//     },
//     password: {
//       type: String,
//       minlength: [7, 'Password length should not be less than 5'],
//     },
//     location: {
//       type: String,
//     },
//     gender: {
//       type: String,
//     },
//     role: {
//       type: String,
//     },
//     about: {
//       type: String,
//     },
//   },
//   {
//     timestamps: true,
//   },
// );
UsersSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next();
    this.password = await bcryptjs_1.default.hash(this.password, 10);
    next();
});
exports.default = mongoose_1.default.model('notesUsers', UsersSchema);
//# sourceMappingURL=signupModel.js.map