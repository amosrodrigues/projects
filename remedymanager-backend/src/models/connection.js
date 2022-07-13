require('dotenv').config();
const { MongoClient } = require('mongodb');

const { MONGO_DB_URL } = process.env;
// const MONGO_DB_URL = 'mongodb://127.0.0.1:27017';

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let db = null;

const connection = () =>
  (db
    ? Promise.resolve(db)
    : MongoClient.connect(MONGO_DB_URL, OPTIONS).then((conn) => {
        db = conn.db('remedy');
        return db;
      }));

module.exports = connection;
