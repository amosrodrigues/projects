const { ObjectId } = require('mongodb');
const connect = require('./connection');

const insertTask = async (taskInfo) => {
  const db = await connect();
  const { insertedId } = await db
    .collection('tasks')
    .insertOne({ ...taskInfo });
  return insertedId;
};

const findAllTasks = async (userId, order) => {
  const { option, action } = order;
  const db = await connect();
  const tasks = await db
    .collection('tasks')
    .find({ userId })
    .sort({ [option]: action })
    .toArray();
  return tasks;
};

const findTaskById = async (id) => {
  const db = await connect();
  const task = await db.collection('tasks').findOne({ _id: ObjectId(id) });
  return task;
};

const updateTask = async (id, task) => {
  const db = await connect();
  await db
    .collection('tasks')
    .updateOne({ _id: ObjectId(id) }, { $set: { ...task } });
};

const deleteTask = async (id) => {
  const db = await connect();
  await db.collection('tasks').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  insertTask,
  findAllTasks,
  findTaskById,
  updateTask,
  deleteTask,
};
