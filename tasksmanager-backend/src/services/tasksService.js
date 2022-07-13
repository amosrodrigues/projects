const Joi = require('joi');
const { ObjectId } = require('mongodb');

const tasksModel = require('../models/tasksModel');

const { badRequest, notFound } = require('../utils/dictionary/statusCode');
const {
  invalidEntries,
  notFoundMsg,
} = require('../utils/dictionary/messagesDefault');
const errorConstructor = require('../utils/functions/errorHandling');

const userSchema = Joi.object({
  name: Joi.string().required(),
  status: Joi.string().required(),
  date: Joi.date().required(),
});

const createTask = async (taskInfo) => {
  const { name, status, date } = taskInfo;
  const { error } = userSchema.validate({ name, status, date });

  if (error) {
    throw errorConstructor(badRequest, invalidEntries);
  }
  const taskId = await tasksModel.insertTask(taskInfo);

  const task = { _id: taskId, ...taskInfo };
  return { task };
};

const getAllTasks = async (userId, order) => {
  const tasks = await tasksModel.findAllTasks(userId, order);
  if (!tasks) {
    throw errorConstructor(notFound, notFoundMsg);
  }
  return tasks;
};

const getTaskByID = async (id) => {
  if (!ObjectId.isValid(id)) throw errorConstructor(notFound, notFoundMsg);
  const recipe = await tasksModel.findTaskById(id);
  if (!recipe) {
    throw errorConstructor(notFound, notFoundMsg);
  }
  return recipe;
};

const uptadeTask = async (id, task, userId) => {
  if (!ObjectId.isValid(id)) throw errorConstructor(notFound, notFoundMsg);
  const { error } = userSchema.validate(task);
  if (error) {
    throw errorConstructor(badRequest, invalidEntries);
  }
  await tasksModel.updateTask(id, task);
  return { _id: id, ...task, userId };
};

const deleteTask = async (id) => {
  if (!ObjectId.isValid(id)) throw errorConstructor(notFound, notFoundMsg);

  const task = await getTaskByID(id);
  if (!task) {
    throw errorConstructor(notFound, notFoundMsg);
  }
  await tasksModel.deleteTask(id);
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskByID,
  uptadeTask,
  deleteTask,
};
