const { ObjectId } = require('mongodb');
const connect = require('./connection');

const insertMaker = async (makerInfo) => {
  const db = await connect();
  const { insertedId } = await db
    .collection('makers')
    .insertOne({ ...makerInfo });
  return insertedId;
};

const findAllMakers = async () => {
  const db = await connect();
  const tasks = await db.collection('makers').find().toArray();
  return tasks;
};

const findMakerById = async (id) => {
  const db = await connect();
  const task = await db.collection('makers').findOne({ _id: ObjectId(id) });
  return task;
};

const updateMaker = async (id, maker) => {
  const db = await connect();
  await db
    .collection('makers')
    .updateOne({ _id: ObjectId(id) }, { $set: { ...maker } });
};

const deleteMaker = async (id) => {
  const db = await connect();
  await db.collection('makers').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  insertMaker,
  findAllMakers,
  findMakerById,
  updateMaker,
  deleteMaker,
};
