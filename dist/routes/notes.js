"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authorization_passport_1 = __importDefault(require("../auth/authorization-passport"));
var notes_Controller_1 = require("../controller/notes-Controller");
var folder_Controller_1 = require("../controller/folder-Controller");
var collaborators_Controller_1 = require("../controller/collaborators-Controller");
var joi_1 = require("../middleware/joi");
var cloudimage_1 = require("../middleware/cloudimage");
var router = (0, express_1.Router)();
router.use(authorization_passport_1.default);
router.get('/tests', function (req, res) {
    // let id = req.user.id
    res.send(req.user.id);
});
router.get('/desc', notes_Controller_1.sortByDesc);
router.post('/search', notes_Controller_1.sortByTitle);
router.post('/createFolder', folder_Controller_1.createFolder); //authorization required
router.get('/getNotification', collaborators_Controller_1.getNotification);
router.get('/:_id', folder_Controller_1.getNote);
router.put('/editnote/:noteId', notes_Controller_1.editNotes);
router.get('/delete/:_id', folder_Controller_1.trashNote);
router.get('/restoredelete/:_id', folder_Controller_1.restoreNote);
router.get('/permanentdelete/:_id', folder_Controller_1.permanentlyDeleteNote);
router.post('/createNote/:folderId', notes_Controller_1.createNote);
router.get('/:noteId/collaborators', notes_Controller_1.getCollaborators);
router.get('/collaborators/notes', notes_Controller_1.getCollaboratorsNotes);
router.get('/getAllNote/:folderId', notes_Controller_1.getAllNotes);
router.post('/invite/:noteId', collaborators_Controller_1.inviteCollborator);
router.post('/collab/:token', joi_1.joiValidateCollab, collaborators_Controller_1.confirmCollaborator);
router.get('/remove/:id', collaborators_Controller_1.removeCollaborator);
router.post('/admin/remove/:id', collaborators_Controller_1.adminRemoveCollaborator);
router.post('/upload/:upId', cloudimage_1.upload, collaborators_Controller_1.uploadFile);
module.exports = router;
