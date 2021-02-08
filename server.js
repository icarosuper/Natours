const mongoose = require('mongoose');
const env = require('dotenv');

env.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE;

(async () => {
	try {
		await mongoose.connect(DB, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		});

		const port = process.env.PORT || 3000;
		app.listen(port, () => {
			console.log(`App rodando na porta ${port}`);
		});
	} catch (err) {
		console.log(err.message);
	}
})();
