const remedyRouter = require('express').Router();

const remedyController = require('../controllers/remedyController');

remedyRouter.post('/', remedyController.createRemedy);
remedyRouter.post('/search', remedyController.getByNameOrId);
remedyRouter.get('/', remedyController.getAllRemedys);
remedyRouter.get('/:id', remedyController.getRemedyById);
remedyRouter.put('/:id', remedyController.updateRemedy);
remedyRouter.delete('/:id', remedyController.deleteRemedy);

module.exports = remedyRouter;
