var express = require('express');
var PersonController = require('../controllers/person');

var router = express.Router();


router.get('/test', PersonController.test);
router.get('/number/:num', PersonController.getNumb);
router.get('/getPerson/:id?', PersonController.getPerson); //?: Parametro es opcional
router.get('/getPersons/:num?', PersonController.getPersons);
router.get('/getPersonsByPagination', PersonController.getPersonsByPagination); //get by pagination
router.post('/savePerson', PersonController.savePerson);
router.delete('/deletePerson/:id', PersonController.deletePerson);
router.delete('/deleteAllPersons', PersonController.deleteAllPersons);
router.put('/updatePerson/:id',PersonController.updatePerson);


module.exports = router;