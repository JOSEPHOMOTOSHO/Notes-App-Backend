"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signin_1 = __importDefault(require("../controller/signin"));
const router = express_1.Router();
router.post('/signin', signin_1.default);
exports.default = router;
//# sourceMappingURL=signin.js.map