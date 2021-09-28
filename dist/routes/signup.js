"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var signupContoller_1 = require("../controller/signupContoller");
var router = express_1.default.Router();
router.post('/signup', signupContoller_1.createUsers);
router.get('/confirm/:token', signupContoller_1.confirmUsers);
exports.default = router;
