const passport = require('passport');
const userRouter = require('express').Router();
const User = require('../controller/user.controller')

userRouter.get('/', User.getUser);
userRouter.get('/list', User.list);
userRouter.delete('/', User.remove);
userRouter.post('/register', User.register);
userRouter.post('/login', passport.authenticate('local'), User.login);
userRouter.get('/logout', User.logout);

module.exports = userRouter;