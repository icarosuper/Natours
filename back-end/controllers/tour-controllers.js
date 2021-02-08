const Tour = require('../models/tour-model');
const APIFeatures = require('../Utils/apiFeatures');

exports.topTours = async (req, res, next) => {
	req.query.limit = '5';
	req.query.sort = '-ratingsAverage,price';
	req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
	next();
};

exports.getAllTours = async (req, res) => {
	try {
		const features = new APIFeatures(Tour.find(), req.query)
			.filter().sort().limitFields().paginate();
		const tours = await features.query;

		res.status(200).json({
			status: 'success',
			requestedAt: req.requestTime,
			results: tours.length,
			data: {
				tours
			}
		});
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err.message
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
				selectedTour
			}
		});
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err.message
		});
	}
};

exports.addTour = async (req, res) => {
	try {
		const newTour = await Tour.create(req.body);

		res.status(201).json({
			status: 'success',
			data: { tour: newTour }
		});
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err.message
		});
	}
};

exports.updateTour = async (req, res) => {
	try {
		const tour = await Tour.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true
			}
		);

		res.status(200).json({
			status: 'success',
			requestedAt: req.requestTime,
			data: {
				tour
			}
		});
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err.message
		});
	}
};

exports.deleteTour = async (req, res) => {
	try {
		await Tour.findByIdAndDelete(req.params.id);

		res.status(204).json({
			status: 'success',
			requestedAt: req.requestTime,
			data: null
		});
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err.message
		});
	}
};

exports.getTourStats = async (req, res) => {
	try {
		const stats = await Tour.aggregate([
			{
				$match: { ratingsAverage: { $gte: 4.5 } }
			},
			{
				$group: {
					_id: { $toUpper: `$${req.query.fields}` },
					results: { $sum: 1 },
					numRatings: { $sum: '$ratingsQuantity' },
					avgRating: { $avg: '$ratingsAverage' },
					avgPrice: { $avg: '$price' },
					minPrice: { $min: '$price' },
					maxPrice: { $max: '$price' }
				}
			},
			{
				$sort: { avgPrice: 1 }
			}
		]);

		res.status(200).json({
			status: 'success',
			requestedAt: req.requestTime,
			data: {
				stats
			}
		});
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err.message
		});
	}
};

exports.getMonthlyPlan = async (req, res) => {
	try {
		const year = parseInt(req.params.year);
		const plan = await Tour.aggregate([
			{
				$unwind: '$startDates'
			},
			{
				$match: {
					startDates: {
						$gte: new Date(`${year}-01-01`),
						$lte: new Date(`${year}-12-31`)
					}
				}
			},
			{
				$group: {
					_id: { $month: '$startDates' },
					numTours: { $sum: 1 },
					tours: { $push: '$name' }
				}
			},
			{
				$addFields: { month: '$_id' }
			},
			{
				$project: {_id: 0}
			},
			{
				$sort: {numTours: -1}
			}
		]);

		res.status(200).json({
			status: 'success',
			requestedAt: req.requestTime,
			data: {
				plan
			}
		});
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err.message
		});
	}
};