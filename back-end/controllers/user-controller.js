const fs = require('fs');

const users = JSON.parse(
	fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

exports.checkID = (req, res, next, val) => {
	const id = parseInt(10, val);
	const user = users.find((el) => el.id === id);
	if (!user) {
		res.status(404).json({
			status: 'failed',
			requestedAt: req.requestTime,
			message: `Não há user de ID ${id}`,
		});
		return;
	}
	req.user = user;
	next();
};

exports.getAllUsers = (req, res) => {
	res.status(200).json({
		status: 'success',
		requestedAt: req.requestTime,
		results: users.length,
		data: {
			users,
		},
	});
};

exports.getUser = ({ user, requestedTime }, res) => {
	res.status(200).json({
		status: 'success',
		requestedAt: requestedTime,
		data: {
			user,
		},
	});
};

exports.addUser = ({ body, requestTime }, res) => {
	const newUser = {
		id: users[users.length - 1].id + 1,
		...body,
	};
	users.push(newUser);

	fs.writeFile(
		`${__dirname}/dev-data/data/users.json`,
		JSON.stringify(users),
		() => {
			res.status(201).json({
				status: 'success',
				requestedAt: requestTime,
				data: { user: newUser },
			});
		}
	);
};

exports.updateUser = ({ user, requestTime }, res) => {
	res.status(200).json({
		status: 'success',
		requestedAt: requestTime,
		data: {
			user: `User de ID ${user.id} atualizado`,
		},
	});
};

exports.deleteUser = ({ requestTime }, res) => {
	res.status(204).json({
		status: 'success',
		requestedAt: requestTime,
		data: null,
	});
};
