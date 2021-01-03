const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'O tour deve ter um nome'],
		unique: true,
		trim: true,
	},
	duration: {
		type: Number,
		required: [true, 'O tour deve ter uma duração fixa'],
	},
	price: {
		type: Number,
		required: [true, 'O tour deve ter um preço definido'],
	},
	maxGroupSize: {
		type: Number,
		required: [true, 'O tour deve ter um tamanho máximo definido'],
	},
	difficulty: {
		type: String,
		required: [true, 'O tour deve ter uma dificuldade'],
	},
	ratingsAverage: {
		type: Number,
		default: 0,
	},
	ratingsQuantity: {
		type: Number,
		default: 0,
	},
	discount: Number,
	summary: {
		type: String,
		trim: true,
		required: [true, 'O tour deve ter uma sinopse']
	},
	description: {
		type: String,
		trim: true,
		required: [true, 'O tour deve ter uma descrição'],
	},
	imageCover: {
		type: String,
		required: [true, 'O tour deve ter uma imagem'],
	},
	images: [String],
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	startDates: [Date],
});

Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
