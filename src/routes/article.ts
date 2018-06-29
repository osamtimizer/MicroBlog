import express from 'express';
import IArticleDocument from '../interfaces/IArticleDocument';
import Article from '../models/article';
import User from '../models/user';
import Tag from '../models/tag';
import IUserDocument from '../interfaces/IUserDocument';
import ITagDocument from '../interfaces/ITagDocument';

import authenticate from '../modules/Authenticator'

const router = express.Router();

router.get('/:articleId', authenticate, async (req, res, next) => {
    const article = <IArticleDocument>await Article.findOne({ _id: req.params.articleId });
    if (!article) {
        req.flash('error', 'no article found');
        return res.redirect('/login');
    }
    res.render('article', {
        title: article.title,
        tag: article.tags,
        content: article.content,
    });
});

router.post('/', authenticate, async (req, res, next) => {
    if (!req.user) {
        req.flash('error', 'login required');
        return res.redirect('/login');
    }
    if (!req.isAuthenticated) {
        req.flash('error', 'login required');
        return res.redirect('/login');
    }

    const user = await User.findOne({ userId: req.user.userId });
    if (!user) return next(new Error('invalid userid'));
    const tag = await Tag.find({ name: req.body.tag, userID: user._id }).catch((err) => {
        return new Tag({
            name: req.body.tag
        });
    });

    const article: IArticleDocument = <IArticleDocument>new Article({
        title: req.body.title,
        content: req.body.content,
        //refなプロパティはここでセットしなくても良い？
        //save時にpushすることもできる模様
        //tag: new Array<ITagDocument>(tag._id),
        //user: user._id,
        created_at: new Date(),
        updated_at: new Date()
    });

    article.save(function (err) {
        article.user = user._id;
        article.tags.push(tag._id);

        article.save((err) => {
            if (err) return next(err);
            res.redirect('/blog');
        });
    });
});

export default router;