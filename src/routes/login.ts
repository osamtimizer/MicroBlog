import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('login');
});

router.post('/',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function (req, res) {
        console.log(req.user);
        res.redirect('/blog');
    }
);

export default router