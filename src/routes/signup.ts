import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('signup');
});

export default router