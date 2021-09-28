"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var signin_1 = __importDefault(require("../controller/signin"));
var router = (0, express_1.Router)();
router.post('/sign', signin_1.default);
exports.default = router;
