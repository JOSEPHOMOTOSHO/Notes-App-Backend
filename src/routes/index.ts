import express from 'express';
import { } from '../controller/controller';

const router = express.Router();

router.get('', (req, res) => {
  res.render('index', {
    title: 'Express App',
  });
});




export = router;
