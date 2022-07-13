const { ObjectId } = require('mongodb');
const connect = require('./connection');

const insertReact = async (reactInfo) => {
  const db = await connect();
  const { insertedId } = await db
    .collection('reacts')
    .insertOne({ ...reactInfo });
  return insertedId;
};

const findAllReacts = async () => {
  const db = await connect();
  const react = await db.collection('reacts').find().toArray();
  return react;
};

const findReactById = async (id) => {
  const db = await connect();
  const react = await db.collection('reacts').findOne({ _id: ObjectId(id) });
  return react;
};

const updateReact = async (id, react) => {
  const db = await connect();
  await db
    .collection('reacts')
    .updateOne({ _id: ObjectId(id) }, { $set: { ...react } });
};

const deleteReact = async (id) => {
  const db = await connect();
  await db.collection('reacts').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  insertReact,
  findAllReacts,
  findReactById,
  updateReact,
  deleteReact,
};
