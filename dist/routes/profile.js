"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// var express = require('express');
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// import { authorization} from "../config/authorize";
/* GET home page. */
router.get('/', function (req, res, next) {
    //   res.render('home');
    res.send(req.user);
});
module.exports = router;
//# sourceMappingURL=profile.js.map