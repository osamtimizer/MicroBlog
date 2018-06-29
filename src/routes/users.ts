import express from 'express';
import redis from 'redis'
import mongoose from 'mongoose'

import IUserDocument from '../interfaces/IUserDocument'
import User from '../models/user'

const redisUrl = 'redis://localhost:6379'
const client = redis.createClient(redisUrl);

var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  client.set('key', 'value', (err, val) => {
    if (!err) console.log(val);
  })
  res.send('respond with a resource');
});

//Create
router.post('/', async(req, res, next) => {

  const userModel = mongoose.model('User');
  const newUser: IUserDocument = <IUserDocument>new userModel({
    userId: req.body.userId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    created_at: new Date(),
    updated_at: new Date()
  });

  newUser.save((err, result) => {
    if (err) {
      console.error(err);
      next(err);
    } else {
      /*
      req.login(result, (err) => {
        if(err) return next(err);
        return res.redirect('/secret');
      });
      */
     req.flash('info', 'signup success, now you can login from here.')
     res.redirect('/login');
    }
  });

});

//Read
router.get('/:userId', async (req, res, next) => {
  const result = await User.find({ _uid: req.body.uid });
  if (result.length === 1) {
    return res.send(JSON.stringify(result[0]));
  }

  res.send('no user found');
});

//Update
router.put('/:userId', (req, res, next) => {

});

//Delete
router.delete('/:userId', (req, res, next) => {

});

export default router;
