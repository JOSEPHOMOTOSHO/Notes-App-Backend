"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var notesController_1 = __importDefault(require("../controller/notesController"));
var router = (0, express_1.Router)();
router.post('/:folderId', notesController_1.default);
exports.default = router;
