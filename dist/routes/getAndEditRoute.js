"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var authorization_passport_1 = __importDefault(require("../auth/authorization-passport"));
var getAndEditNote_1 = require("../controller/getAndEditNote");
router.get('/getAllNote/:folderId', authorization_passport_1.default, getAndEditNote_1.getAllNotes);
router.get('/desc', getAndEditNote_1.sortByDesc);
module.exports = router;
