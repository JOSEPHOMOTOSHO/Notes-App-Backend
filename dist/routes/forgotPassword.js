"use strict";
const express_1 = require("express");
const forgotPassword_1 = require("../controller/forgotPassword");
const router = (0, express_1.Router)();
router.get('/recoveryemail', forgotPassword_1.getEmailFromUser);
router.post('/recoveryemail', forgotPassword_1.resetPasswordLink);
router.get('/reset/:token', forgotPassword_1.displayNewPasswordForm);
router.post('/newpassword', forgotPassword_1.processNewPasswordFromUser);
module.exports = router;
//# sourceMappingURL=forgotPassword.js.map