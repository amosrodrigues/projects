const reactRouter = require('express').Router();

const reactController = require('../controllers/reactController');

reactRouter.post('/', reactController.createReact);
reactRouter.get('/', reactController.getAllReacts);
reactRouter.get('/:id', reactController.getReactByID);
reactRouter.put('/:id', reactController.uptadeReact);
reactRouter.delete('/:id', reactController.deleteReact);

module.exports = reactRouter;
