"use strict";
var express_1 = require("express");
var forgotPassword_1 = require("../controller/forgotPassword");
var router = (0, express_1.Router)();
router.get('/recovery-email', forgotPassword_1.getEmailFromUser);
router.post('/recovery-email', forgotPassword_1.resetPasswordLink);
router.get('/reset/:token', forgotPassword_1.displayNewPasswordForm);
router.post('/reset', forgotPassword_1.processNewPasswordFromUser);
module.exports = router;
