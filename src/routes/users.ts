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

  //TODO: password must be hashed.
  let hashed = '';

  const newUser: IUserDocument = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashed,
    created_at: new Date(),
    updated_at: new Date()
  });

  const result = await newUser.save();


});

//Read
router.get('/:userId', async(req, res, next) => {
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
