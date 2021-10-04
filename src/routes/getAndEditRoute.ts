import express, {Request, Response, NextFunction} from "express"
const router = express.Router();
import authorization from '../auth/authorization-passport';
import { sortByDesc, getAllNotes} from '../controller/getAndEditNote';


router.get('/getAllNote/:folderId', authorization, getAllNotes)

router.get('/desc', sortByDesc)

module.exports = router;