const express = require('express');
const userCon = require('../controllers/user-controllers');

const router = express.Router();

router.param('id', userCon.checkID);

router.route('/').get(userCon.getAllUsers).post(userCon.addUser);

router
	.route('/:id')
	.get(userCon.getUser)
	.patch(userCon.updateUser)
	.delete(userCon.deleteUser);

module.exports = router;
