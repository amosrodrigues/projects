const Joi = require('joi');
const { ObjectId } = require('mongodb');

const MakerModel = require('../models/makerModel');

const { badRequest, notFound } = require('../utils/dictionary/statusCode');
const {
  invalidEntries,
  notFoundMsg,
} = require('../utils/dictionary/messagesDefault');
const errorConstructor = require('../utils/functions/errorHandling');

const userSchema = Joi.object({
  name: Joi.string().required(),
});

const createMaker = async (makerInfo) => {
  const { name } = makerInfo;
  const { error } = userSchema.validate({ name });

  if (error) {
    throw errorConstructor(badRequest, invalidEntries);
  }
  const makerId = await MakerModel.insertMaker(makerInfo);

  const maker = { _id: makerId, ...makerInfo };
  return { maker };
};

const getAllMakers = async () => {
  const makers = await MakerModel.findAllMakers();
  if (!makers) {
    throw errorConstructor(notFound, notFoundMsg);
  }
  return makers;
};

const getMakerByID = async (id) => {
  if (!ObjectId.isValid(id)) throw errorConstructor(notFound, notFoundMsg);
  const maker = await MakerModel.findMakerById(id);
  if (!maker) {
    throw errorConstructor(notFound, notFoundMsg);
  }
  return maker;
};

const uptadeMaker = async (id, maker) => {
  if (!ObjectId.isValid(id)) throw errorConstructor(notFound, notFoundMsg);
  const { error } = userSchema.validate(maker);
  if (error) {
    throw errorConstructor(badRequest, invalidEntries);
  }
  await MakerModel.updateMaker(id, maker);
  return { _id: id, ...maker };
};

const deleteMaker = async (id) => {
  if (!ObjectId.isValid(id)) throw errorConstructor(notFound, notFoundMsg);

  const maker = await getMakerByID(id);
  if (!maker) {
    throw errorConstructor(notFound, notFoundMsg);
  }
  await MakerModel.deleteMaker(id);
};

module.exports = {
  createMaker,
  getAllMakers,
  getMakerByID,
  uptadeMaker,
  deleteMaker,
};
