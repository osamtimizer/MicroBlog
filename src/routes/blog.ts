import express from 'express';
import passport from 'passport';
import authenticate from '../modules/Authenticator'
import Article from '../models/article';
import User from '../models/user';
var router = express.Router();

router.get('/', authenticate, (req, res, next) => {
    //show the latest 10 articles and pagenation.
    if (!req.user) {
        req.flash('error', 'login required');
        return res.redirect('login');
    }
    const query = Article.find({}).populate('user').sort({ 'created_at': -1 }).limit(10);
    query.exec((err, articles) => {
        res.render('allArticles', { articles: articles, user: req.user });
    });
});

router.get('/newArticle', authenticate, (req, res, next) => {
    res.render('newArticle');
});

export default router;