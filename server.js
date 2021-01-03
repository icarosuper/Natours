const mongoose = require('mongoose');
const env = require('dotenv');

env.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace('PASSWORD', process.env.PASSWORD);

mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => {
		console.log('Conexão feita com sucesso!');
	});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`App rodando na porta ${port}`);
});
