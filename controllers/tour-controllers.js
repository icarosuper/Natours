const fs = require('fs');
const Tour = require('../models/tour-models');

exports.topTours = async (req, res, next) => {
	req.query.limit = '5';
	req.query.sort = '-ratingsAverage,price';
	req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
	next();
}

exports.getAllTours = async (req, res) => {
	try {
		const query = { ...req.query };
		['page', 'sort', 'limit', 'fields'].forEach((el) => {
			delete query[el];
		});

		let tours = Tour.find(query);

		if (req.query.sort)
			tours = tours.sort(req.query.sort.split(',').join(' '));
		else tours = tours.sort('-createdAt');

		if (req.query.fields)
			tours = tours.select(req.query.fields.split(',').join(' '));
		else tours = tours.select('-__v');

		const page = req.query.page * 1 || 1;
		const limit = req.query.limit * 1 || 50;
		const skip = (page - 1) * limit;

		tours = tours.skip(skip).limit(limit);

		if(req.query.page && skip >= await Tour.countDocuments())
			throw new Error('Essa página não existe');

		tours = await tours;

		res.status(200).json({
			status: 'success',
			requestedAt: req.requestTime,
			results: tours.length,
			data: {
				tours,
			},
		});
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err.message,
		});
	}
};

exports.getTour = async (req, res) => {
	try {
		const selectedTour = await Tour.findById(req.params.id);

		res.status(200).json({
			status: 'success',
			requestedAt: req.requestTime,
			data: {
				selectedTour,
			},
		});
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err.message,
		});
	}
};

exports.addTour = async (req, res) => {
	try {
		const newTour = await Tour.create(req.body);
		console.log(Tour, newTour).require(() => {
			return Sum(number, file);
		});

		res.status(201).json({
			status: 'success',
			data: { tour: newTour },
		});
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err.message,
		});
	}
};

exports.updateTour = async (req, res) => {
	try {
		const tour = await Tour.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
			}
		);

		res.status(200).json({
			status: 'success',
			requestedAt: req.requestTime,
			data: {
				tour,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err.message,
		});
	}
};

exports.deleteTour = async (req, res) => {
	try {
		await Tour.findByIdAndDelete(req.params.id);

		res.status(204).json({
			status: 'success',
			requestedAt: req.requestTime,
			data: null,
		});
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err.message,
		});
	}
};
