import express from 'express';
import passport from 'passport'
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/secret', authenticator, (req, res, next) => {
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

function authenticator(req, res: express.Response, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('error', 'login required.');
    res.redirect('/login');
  }
}

export default router;
