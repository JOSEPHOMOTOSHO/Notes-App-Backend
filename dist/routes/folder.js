"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authorization_passport_1 = __importDefault(require("../auth/authorization-passport"));
var router = express_1.default.Router();
var folderController_1 = require("../controller/folderController");
router.post('/create', authorization_passport_1.default, folderController_1.createFolder);
router.get('/:_id', authorization_passport_1.default, folderController_1.getNote);
router.get('/delete/:_id', authorization_passport_1.default, folderController_1.trashNote);
module.exports = router;
