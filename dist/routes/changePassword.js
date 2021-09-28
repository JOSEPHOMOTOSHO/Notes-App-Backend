"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const changePassword_1 = __importDefault(require("../controller/changePassword"));
const authorization_1 = __importDefault(require("../auth/authorization"));
const router = (0, express_1.Router)();
router.post('/changePassword', authorization_1.default, changePassword_1.default);
module.exports = router;
//# sourceMappingURL=changePassword.js.map