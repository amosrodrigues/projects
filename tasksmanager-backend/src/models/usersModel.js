const connect = require('./connection');

const insertUser = async (name, email, password, role) => {
  const db = await connect();
  const { insertedId } = await db
    .collection('users')
    .insertOne({ name, email, password, role });

  return insertedId;
};

const findUserByEmail = async (email) => {
  const db = await connect();
  const user = await db.collection('users').findOne({ email });
  return user;
};

module.exports = {
  insertUser,
  findUserByEmail,
};