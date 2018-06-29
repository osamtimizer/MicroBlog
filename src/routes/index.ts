import express from 'express';
import passport from 'passport';
import authenticate from '../modules/Authenticator'
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/secret', authenticate, (req, res, next) => {
  let username = '';
  let email = '';
  if (req.user) {
    username = req.user.userId;
    email = req.user.email;
  }
  res.render('secret', {
    title: 'Express',
    username: username,
    email: email
  });
});


export default router;
