const express = require('express');
const router = express.Router();

const schoolController=require('../controllers/schoolController');
// routes dealing with school collection

//searching the school
router.post('/search',schoolController.getSchool);
//sorting the records
router.post('/sort',schoolController.getSortedResult);
//applying filter to records
router.post('/filter',schoolController.filter);
//google map integration
router.post('/location',schoolController.googleMapIntegration);

module.exports = router;

