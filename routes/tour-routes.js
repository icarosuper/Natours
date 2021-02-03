const express = require('express');
const tourCon = require('../controllers/tour-controllers');

const router = express.Router();

router
	.route('/top-tours')
	.get(tourCon.topTours, tourCon.getAllTours);

router
	.route('/tour-stats')
	.get(tourCon.getTourStats);

router
	.route('/monthly-plan/:year')
	.get(tourCon.getMonthlyPlan);

router
	.route('/')
	.get(tourCon.getAllTours)
	.post(tourCon.addTour);

router
	.route('/:id')
	.get(tourCon.getTour)
	.patch(tourCon.updateTour)
	.delete(tourCon.deleteTour);

module.exports = router;
