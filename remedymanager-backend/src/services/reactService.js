const Joi = require('joi');
const { ObjectId } = require('mongodb');

const ReactModel = require('../models/reactModel');

const { badRequest, notFound } = require('../utils/dictionary/statusCode');
const {
  invalidEntries,
  notFoundMsg,
} = require('../utils/dictionary/messagesDefault');
const errorConstructor = require('../utils/functions/errorHandling');

const userSchema = Joi.object({
  name: Joi.string().required(),
});

const createReact = async (reactInfo) => {
  const { name } = reactInfo;
  const { error } = userSchema.validate({ name });

  if (error) {
    throw errorConstructor(badRequest, invalidEntries);
  }
  const reactId = await ReactModel.insertReact(reactInfo);

  const react = { _id: reactId, ...reactInfo };
  return { react };
};

const getAllReacts = async () => {
  const reacts = await ReactModel.findAllReacts();
  if (!reacts) {
    throw errorConstructor(notFound, notFoundMsg);
  }
  return reacts;
};

const getReactByID = async (id) => {
  if (!ObjectId.isValid(id)) throw errorConstructor(notFound, notFoundMsg);
  const react = await ReactModel.findReactById(id);
  if (!react) {
    throw errorConstructor(notFound, notFoundMsg);
  }
  return react;
};

const uptadeReact = async (id, react) => {
  if (!ObjectId.isValid(id)) throw errorConstructor(notFound, notFoundMsg);
  const { error } = userSchema.validate(react);
  if (error) {
    throw errorConstructor(badRequest, invalidEntries);
  }
  await ReactModel.updateReact(id, react);
  return { _id: id, ...react };
};

const deleteReact = async (id) => {
  if (!ObjectId.isValid(id)) throw errorConstructor(notFound, notFoundMsg);

  const react = await getReactByID(id);
  if (!react) {
    throw errorConstructor(notFound, notFoundMsg);
  }
  await ReactModel.deleteReact(id);
};

module.exports = {
  createReact,
  getAllReacts,
  getReactByID,
  uptadeReact,
  deleteReact,
};
