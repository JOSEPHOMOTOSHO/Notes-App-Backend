"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
// import userController from './user.controller';
const router = express_1.default.Router();
router.get('/auth/facebook', passport_1.default.authenticate('facebook'));
router.get('/auth/facebook/callback', passport_1.default.authenticate('facebook', {
    successRedirect: '/testing',
    failureRedirect: '/testing/fail',
}));
router.get('/fail', (req, res) => {
    res.send('Failed attempt');
});
router.get('/', (req, res) => {
    res.send('Success');
});
module.exports = router;
//# sourceMappingURL=userRoutes.js.map