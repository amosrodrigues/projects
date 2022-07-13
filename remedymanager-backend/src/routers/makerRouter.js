const makerRouter = require('express').Router();

const makerController = require('../controllers/makerController');

makerRouter.post('/', makerController.createMaker);
makerRouter.get('/', makerController.getAllMakers);
makerRouter.get('/:id', makerController.getMakerByID);
makerRouter.put('/:id', makerController.uptadeMaker);
makerRouter.delete('/:id', makerController.deleteMaker);

module.exports = makerRouter;
