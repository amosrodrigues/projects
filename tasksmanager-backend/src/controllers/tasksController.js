const TaskService = require('../services/tasksService');
const {
  created,
  success,
  noContent,
} = require('../utils/dictionary/statusCode');

const createTask = async (req, res, next) => {
  const { name, status } = req.body;
  const date = new Date(req.body.date);

  const { _id } = req.user;
  const task = {
    name,
    status,
    date,
    userId: _id,
  };

  try {
    const newRecipe = await TaskService.createTask(task);
    return res.status(created).json(newRecipe);
  } catch (error) {
    return next(error);
  }
};

const getAllTasks = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const tasks = await TaskService.getAllTasks(_id, req.body);
    return res.status(success).json(tasks);
  } catch (error) {
    return next(error);
  }
};

const getTaskByID = async (req, res, next) => {
  const { id } = req.params;

  try {
    const task = await TaskService.getTaskByID(id);
    return res.status(success).json(task);
  } catch (error) {
    return next(error);
  }
};

const uptadeTask = async (req, res, next) => {
  const { name, status } = req.body;
  const date = new Date(req.body.date);
  const { id } = req.params;
  const { _id } = req.user;

  const task = {
    name,
    status,
    date,
  };

  try {
    const taskUpadated = await TaskService.uptadeTask(id, task, _id);
    return res.status(success).json(taskUpadated);
  } catch (error) {
    return next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    await TaskService.deleteTask(id);
    return res.status(noContent).json();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskByID,
  uptadeTask,
  deleteTask,
};
