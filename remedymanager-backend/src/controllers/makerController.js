const MakerService = require('../services/makerService');
const {
  created,
  success,
  noContent,
} = require('../utils/dictionary/statusCode');

const createMaker = async (req, res, next) => {
  try {
    const newMaker = await MakerService.createMaker(req.body);
    return res.status(created).json(newMaker);
  } catch (error) {
    return next(error);
  }
};

const getAllMakers = async (_req, res, next) => {
  try {
    const maker = await MakerService.getAllMakers();
    return res.status(success).json(maker);
  } catch (error) {
    return next(error);
  }
};

const getMakerByID = async (req, res, next) => {
  const { id } = req.params;

  try {
    const maker = await MakerService.getMakerByID(id);
    return res.status(success).json(maker);
  } catch (error) {
    return next(error);
  }
};

const uptadeMaker = async (req, res, next) => {
  const { id } = req.params;

  try {
    const makerUpadated = await MakerService.uptadeMaker(id, req.body);
    return res.status(success).json(makerUpadated);
  } catch (error) {
    return next(error);
  }
};

const deleteMaker = async (req, res, next) => {
  try {
    const { id } = req.params;
    await MakerService.deleteMaker(id);
    return res.status(noContent).json();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createMaker,
  getAllMakers,
  getMakerByID,
  uptadeMaker,
  deleteMaker,
};
