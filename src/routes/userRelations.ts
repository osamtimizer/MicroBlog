import express from 'express';
import mongoose from 'mongoose';
import authenticate from '../modules/Authenticator';

import IUserDocument from '../interfaces/IUserDocument';
import IUserRelationDocument from '../interfaces/IUserDocument';
import User from '../models/user';
import UserRelation from '../models/UserRelation';

var router = express.Router();

router.get('/', authenticate, (req, res, next) => {
    if (!req.user) return res.json({}).end();

});

router.post('/', authenticate, async function (req, res, next) {
    if (!req.user) return res.status(400).end();
    const userId = req.user.userId;
    const followUserId = req.body.userId;
    if (userId === followUserId) return res.status(400).send("you can't follow yourself.");

    const myself = await User.findOne({ userId: userId });
    const target = await User.findOne({ userId: followUserId });

    if (!myself || !target) return res.status(400).end();

    const userRelation = new UserRelation({
    });

    userRelation.save(function (err) {
        //TODO:IdObjectに変換しないといけない、これはただのstring
        userRelation.userId = myself._id;
        userRelation.followUserId = target._id;
        userRelation.save((err) => {
            if (err) return next(err);
            //res.status(201).end();
            const infoMessage = "You followed " + followUserId;
            req.flash('info', infoMessage);
            res.redirect('/blog');
        })
    });

});

export default router;
