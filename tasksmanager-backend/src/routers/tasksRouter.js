const taskRouter = require('express').Router();

const { auth } = require('../middlewares');

const tasksController = require('../controllers/tasksController');

taskRouter.post('/', auth, tasksController.createTask);
taskRouter.post('/all', auth, tasksController.getAllTasks);
taskRouter.get('/:id', tasksController.getTaskByID);
taskRouter.put('/:id', auth, tasksController.uptadeTask);
taskRouter.delete('/:id', auth, tasksController.deleteTask);

module.exports = taskRouter;
