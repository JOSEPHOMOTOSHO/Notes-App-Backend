"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var collaborators_Controller_1 = require("../controller/collaborators-Controller");
var joi_1 = require("../middleware/joi");
var authorization_passport_1 = __importDefault(require("../auth/authorization-passport"));
var cloudimage_1 = require("../middleware/cloudimage");
var router = express_1.default.Router();
router.use(authorization_passport_1.default);
router.post('/:noteId', collaborators_Controller_1.inviteCollborator);
router.post('/collab/:token', joi_1.joiValidateCollab, collaborators_Controller_1.confirmCollaborator);
router.get('/remove/:id', collaborators_Controller_1.removeCollaborator);
router.post('/upload/:upId', cloudimage_1.upload, collaborators_Controller_1.uploadFile);
module.exports = router;
