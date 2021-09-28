// var express = require('express');
import express, {Request, Response, NextFunction} from "express"
const router = express.Router();
// import { authorization} from "../config/authorize";
/* GET home page. */
router.get('/',  function(req:Request, res:Response, next:NextFunction) {
    
//   res.render('home');
  res.send(req.user)
});

module.exports = router;
