import express from 'express';

export default function authenticator(req, res: express.Response, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('error', 'login required.');
    res.redirect('/login');
  }
}