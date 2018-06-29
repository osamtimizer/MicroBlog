import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/', (req, res, next) => {
    req.logout();
    res.redirect('/login');
});

export default router