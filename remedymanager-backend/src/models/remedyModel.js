const { ObjectId } = require('mongodb');
const connect = require('./connection');

const insertRemedy = async (remdyInfo) => {
  const db = await connect();
  const { insertedId } = await db
    .collection('remedy')
    .insertOne({ ...remdyInfo });
  return insertedId;
};

const findAllRemedys = async () => {
  const db = await connect();
  const remedys = await db.collection('remedy').find().toArray();
  return remedys;
};

const findRemedyById = async (id) => {
  const db = await connect();
  const remedy = await db.collection('remedy').findOne({ _id: ObjectId(id) });
  return remedy;
};

const findByNameOrId = async (search) => {
  const { option, term } = search;
  const db = await connect();
  if (option === 'name') {
    const remedy = await db
      .collection('remedy')
      .find({
        [option]: { $regex: term },
      })
      .toArray();
    return remedy;
  }
  const remedy = await db
    .collection('remedy')
    .find({
      [option]: { $in: [term, ObjectId(term)] },
    })
    .toArray();
  return remedy;
};

const updateRemedy = async (id, remedy) => {
  const db = await connect();
  await db
    .collection('remedy')
    .updateOne({ _id: ObjectId(id) }, { $set: { ...remedy } });
};

const deleteRemedy = async (id) => {
  const db = await connect();
  await db.collection('remedy').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  insertRemedy,
  findAllRemedys,
  findRemedyById,
  findByNameOrId,
  updateRemedy,
  deleteRemedy,
};
