const ReactService = require('../services/reactService');
const {
  created,
  success,
  noContent,
} = require('../utils/dictionary/statusCode');

const createReact = async (req, res, next) => {
  try {
    const newReact = await ReactService.createReact(req.body);
    return res.status(created).json(newReact);
  } catch (error) {
    return next(error);
  }
};

const getAllReacts = async (_req, res, next) => {
  try {
    const react = await ReactService.getAllReacts();
    return res.status(success).json(react);
  } catch (error) {
    return next(error);
  }
};

const getReactByID = async (req, res, next) => {
  const { id } = req.params;

  try {
    const react = await ReactService.getReactByID(id);
    return res.status(success).json(react);
  } catch (error) {
    return next(error);
  }
};

const uptadeReact = async (req, res, next) => {
  const { id } = req.params;

  try {
    const reactUpadated = await ReactService.uptadeReact(id, req.body);
    return res.status(success).json(reactUpadated);
  } catch (error) {
    return next(error);
  }
};

const deleteReact = async (req, res, next) => {
  try {
    const { id } = req.params;
    await ReactService.deleteReact(id);
    return res.status(noContent).json();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createReact,
  getAllReacts,
  getReactByID,
  uptadeReact,
  deleteReact,
};
