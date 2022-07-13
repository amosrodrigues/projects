const Joi = require('joi');
const { ObjectId } = require('mongodb');

const RemedyModel = require('../models/remedyModel');

const { badRequest, notFound } = require('../utils/dictionary/statusCode');
const {
  invalidEntries,
  notFoundMsg,
} = require('../utils/dictionary/messagesDefault');
const errorConstructor = require('../utils/functions/errorHandling');

const userSchema = Joi.object({
  nroAnvisa: Joi.string().required(),
  name: Joi.string().required(),
  price: Joi.string().required(),
  dateValid: Joi.date().required(),
  phone: Joi.string().required(),
  pills: Joi.string().required(),
  maker: Joi.string().required(),
  reacts: Joi.array(),
});

const createRemedy = async (remedyInfo) => {
  const { error } = userSchema.validate(remedyInfo);

  if (error) {
    throw errorConstructor(badRequest, invalidEntries);
  }
  const remedyId = await RemedyModel.insertRemedy(remedyInfo);

  const remedy = { _id: remedyId, ...remedyInfo };
  return { remedy };
};

const getAllRemedys = async () => {
  const remedys = await RemedyModel.findAllRemedys();
  if (!remedys) {
    throw errorConstructor(notFound, notFoundMsg);
  }
  return remedys;
};

const getRemedyById = async (id) => {
  if (!ObjectId.isValid(id)) throw errorConstructor(notFound, notFoundMsg);
  const remedy = await RemedyModel.findRemedyById(id);
  if (!remedy) {
    throw errorConstructor(notFound, notFoundMsg);
  }
  return remedy;
};

const getByNameOrId = async (search) => {
  const remedy = await RemedyModel.findByNameOrId(search);
  if (!remedy) {
    throw errorConstructor(notFound, notFoundMsg);
  }
  return remedy;
};

const updateRemedy = async (id, remedy) => {
  if (!ObjectId.isValid(id)) throw errorConstructor(notFound, notFoundMsg);
  const { error } = userSchema.validate(remedy);
  if (error) {
    throw errorConstructor(badRequest, invalidEntries);
  }
  await RemedyModel.updateRemedy(id, remedy);
  return { _id: id, ...remedy };
};

const deleteRemedy = async (id) => {
  if (!ObjectId.isValid(id)) throw errorConstructor(notFound, notFoundMsg);

  const remedy = await getRemedyById(id);
  if (!remedy) {
    throw errorConstructor(notFound, notFoundMsg);
  }
  await RemedyModel.deleteRemedy(id);
};

module.exports = {
  createRemedy,
  getAllRemedys,
  getRemedyById,
  getByNameOrId,
  updateRemedy,
  deleteRemedy,
};
