const userRouter = require('express').Router();

const useController = require('../controllers/usersController');

userRouter.post('/', useController.createUser);

module.exports = userRouter;