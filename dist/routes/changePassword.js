"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = require("express");
var changePassword_1 = __importDefault(require("../controller/changePassword"));
var authorization_passport_1 = __importDefault(require("../auth/authorization-passport"));
var router = (0, express_1.Router)();
router.post('/changePassword', authorization_passport_1.default, changePassword_1.default);
module.exports = router;
