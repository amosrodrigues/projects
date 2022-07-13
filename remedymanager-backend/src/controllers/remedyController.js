const RemdeyService = require('../services/remedyService');
const {
  created,
  success,
  noContent,
} = require('../utils/dictionary/statusCode');

const createRemedy = async (req, res, next) => {
  const dateValid = new Date(req.body.dateValid);
  const remedy = { ...req.body, dateValid };

  try {
    const newRemedy = await RemdeyService.createRemedy(remedy);
    return res.status(created).json(newRemedy);
  } catch (error) {
    return next(error);
  }
};

const getAllRemedys = async (_req, res, next) => {
  try {
    const remedys = await RemdeyService.getAllRemedys();
    return res.status(success).json(remedys);
  } catch (error) {
    return next(error);
  }
};

const getRemedyById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const remedy = await RemdeyService.getRemedyById(id);
    return res.status(success).json(remedy);
  } catch (error) {
    return next(error);
  }
};

const getByNameOrId = async (req, res, next) => {
  try {
    const remedy = await RemdeyService.getByNameOrId(req.body);
    return res.status(success).json(remedy);
  } catch (error) {
    return next(error);
  }
};

const updateRemedy = async (req, res, next) => {
  const dateValid = new Date(req.body.dateValid);
  const { id } = req.params;

  const remedy = {
    ...req.body,
    dateValid,
  };

  try {
    const remedyUpadated = await RemdeyService.updateRemedy(id, remedy);
    return res.status(success).json(remedyUpadated);
  } catch (error) {
    return next(error);
  }
};

const deleteRemedy = async (req, res, next) => {
  try {
    const { id } = req.params;
    await RemdeyService.deleteRemedy(id);
    return res.status(noContent).json();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createRemedy,
  getAllRemedys,
  getRemedyById,
  getByNameOrId,
  updateRemedy,
  deleteRemedy,
};
